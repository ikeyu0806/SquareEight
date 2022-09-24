class Api::Internal::ReservationsController < ApplicationController
  before_action :merchant_login_only!, except: [:create, :show, :insert_time_payment_method, :confirm]

  def insert_time_payment_method
    ActiveRecord::Base.transaction do
      date = reservation_params[:reservation_date].split("-")
      start_at = reservation_params[:time].split("-")[0].split(":")
      end_at = reservation_params[:time].split("-")[1].split(":")

      start_datetime = DateTime.new(date[0].to_i, date[1].to_i, date[2].to_i, start_at[0].to_i, start_at[1].to_i, 0, "+09:00")
      end_datetime = DateTime.new(date[0].to_i, date[1].to_i, date[2].to_i, end_at[0].to_i, end_at[1].to_i, 0, "+09:00")

      reserve_frame = ReserveFrame.find(reservation_params[:reserve_frame_id])
      reservation = reserve_frame
      .reservations
      .create!( number_of_people: reservation_params[:reserve_count],
                price: reservation_params[:price],
                start_at: start_datetime,
                end_at: end_datetime,
                status: 'inputTimeWithPaymentMethod',
                payment_method: reservation_params[:payment_method],
                ticket_master_id: reservation_params[:ticket_id],
                monthly_payment_plan_id: reservation_params[:monthly_payment_plan_id],
                ticket_consume_number: reservation_params[:consume_number].to_i,
                end_user_id: current_end_user.present? ? current_end_user.id : nil)
      render json: { status: 'success', reservation: reservation }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def register_customer_info
    ActiveRecord::Base.transaction do
      render json: { status: 'success', reservation: reservation }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def confirm
    ActiveRecord::Base.transaction do
      reservation = Reservation.find(reservation_params[:id])
      reserve_frame = reservation.reserve_frame
      # 定員オーバチェック
      remaining_capacity_count = reserve_frame.remaining_capacity_count_within_range(reservation.start_at, reservation.end_at)
      raise '定員オーバです' if remaining_capacity_count <= 0
      # リソースチェック
      resources = reserve_frame.resources
      resources.each do |resource|
        resource_remaining_capacity_count = resource.remaining_capacity_count_within_range(start_datetime, end_datetime)
        raise '予約できません。使用する設備備品やスタッフなどのリソースが足りていません' if resource_remaining_capacity_count <= 0
      end
      # 顧客ID登録
      # 同じ携帯電話番号の顧客データがなければ作成
      if current_end_user.present?
        # 顧客データ作成
        if current_end_user.customer.present?
          customer = current_end_user.customer
        else
          customer = Customer.new(account_id: reserve_frame.account_id, end_user_id: current_end_user.id)
        end
        customer.last_name = reservation_params[:last_name]
        customer.first_name = reservation_params[:first_name]
        customer.email = reservation_params[:email]
        customer.phone_number = reservation_params[:phone_number]
        customer.end_user_id = current_end_user.id
        customer.save!
        # 一回別の変数に代入しないと更新できない
        end_user = current_end_user
        end_user.last_name = reservation_params[:last_name] if current_end_user.last_name.blank?
        end_user.first_name = reservation_params[:first_name] if current_end_user.first_name.blank?
        end_user.email = reservation_params[:email] if current_end_user.email.blank?
        end_user.phone_number = reservation_params[:phone_number] if current_end_user.phone_number.blank?
        end_user.save!
      else
        customer = reserve_frame.account.customers.find_or_initialize_by(phone_number: reservation_params[:phone_number])
        customer.last_name = reservation_params[:last_name]
        customer.first_name = reservation_params[:first_name]
        customer.email = reservation_params[:email]
        customer.phone_number = reservation_params[:phone_number]
        customer.end_user_id = current_end_user.id if current_end_user.present?
        customer.save!
      end
      # 確定
      reservation
      .update!( customer_id: customer.id,
                status: reserve_frame.reception_type == 'Immediate' ? 'confirm' : 'pendingVerifivation',
                representative_first_name: reservation_params[:first_name],
                representative_last_name: reservation_params[:last_name],
                end_user_id: current_end_user.present? ? current_end_user.id : nil)

      # 通知作成
      # カスタマー向け
      if current_end_user.present?
        customer_notification_title = reservation.start_at.strftime("%Y年%m月%d日%H時%m分") + 'に' + reserve_frame.title + ' を予約しました'
        end_user_notification_url = '/customer_page/reservation'
        current_end_user
        .end_user_notifications
        .create!(title: customer_notification_title, url: end_user_notification_url)
      end
      # ビジネスオーナー向け  
      account_notification_title = customer.full_name + 'が' + reservation.start_at.strftime("%Y年%m月%d日%H時%m分") + 'に' + reserve_frame.title + ' を予約しました'
      account_notification_url = '/admin/reservation'
      reserve_frame.account.account_notifications
      .create!(title: account_notification_title, url: account_notification_url)
  
      # 支払い実行
      # StripeへのリクエストはActiveRecordのTransactionで取り消せないので最後に実行
      if reserve_frame.reception_type  == "Immediate" && reserve_frame.is_set_price?
        case reservation.payment_method
        when 'creditCardPayment'
          raise 'ログインしてください' if current_end_user.blank?
          # 決済
          Stripe.api_key = Rails.configuration.stripe[:secret_key]
          stripe_customer = Stripe::Customer.retrieve(current_end_user.stripe_customer_id)
          default_payment_method_id = stripe_customer["invoice_settings"]["default_payment_method"]
          commission = (reservation.price * 0.04).to_i
          payment_intent = Stripe::PaymentIntent.create({
            amount: reservation.price,
            currency: 'jpy',
            payment_method_types: ['card'],
            payment_method: default_payment_method_id,
            customer: current_end_user.stripe_customer_id,
            application_fee_amount: commission,
            metadata: {
              'order_date': current_date_text,
              'account_business_name': reserve_frame.account.business_name,
              'purchase_product_name': reserve_frame.title,
              'price': reservation.price,
              'type': 'reservation',
              'reserve_frame_id': reserve_frame.id
            },
            transfer_data: {
              destination: reserve_frame.account.stripe_account_id
            }
          })
          Stripe::PaymentIntent.confirm(
            payment_intent.id
          )
          reservation.update!(stripe_payment_intent_id: payment_intent.id)
          # 注文データ作成
          order = current_end_user.orders.new
          order.order_items.new(item_type: 'Reservation',
                                account_id: reserve_frame.account.id,
                                reservation_id: reservation.id,
                                product_name: reserve_frame.title,
                                price: reservation.price,
                                commission: commission)
          order.save!
        when 'ticket'
          raise 'ログインしてください' if current_end_user.blank?
          ticket_master = TicketMaster.find(reservation_params[:ticket_id])
          purchased_tickets = current_end_user
                              .purchased_tickets
                              .where(ticket_master_id: ticket_master.id)
                              .where("expired_at >= ?", Time.zone.now)
                              .order(:expired_at)
        
          total_remain_number = purchased_tickets.sum(:remain_number)
          raise 'チケットが足りません' if total_remain_number < reserve_frame.consume_number
          reserve_frame.consume_number.times do |count|
            purchased_ticket = purchased_tickets.where("remain_number > ?", 0).first
            purchased_ticket.update!(remain_number: purchased_ticket.remain_number - 1)
          end
        when 'monthlyPaymentPlan'
          is_subscribe_plan = current_end_user.search_stripe_subscriptions.pluck("metadata")&.pluck("monthly_payment_plan_id")
          raise 'プランに加入していません' unless is_subscribe_plan
        else
        end
      end

      render json: { status: 'success', reservation: reservation }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def show
    reservation = Reservation.find(params[:id])
    raise 'key is not match' if reservation.viewable_key != params[:viewable_key]
    reservation = JSON.parse(reservation.to_json(methods: [:reserve_frame_title, :display_payment_method, :display_status, :display_reservation_datetime]))
    render json: { status: 'success', reservation: reservation }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update_status
    ActiveRecord::Base.transaction do
      reservation = Reservation.find(reservation_params[:id])
      reservation.update!(status: reservation_params[:status])
      ReservationMailer.send_confirm_mail(reservation.customer.email, "予約を確定しました", reservation.reserve_frame.title, reservation.display_reservation_datetime, reservation.display_payment_method, reservation.number_of_people).deliver_later
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def register_by_merchant_control
    ActiveRecord::Base.transaction do
      date = reservation_params[:reservation_date].split("-")
      start_at = reservation_params[:start_time].split("-")[0].split(":")
      end_at = reservation_params[:end_time].split("-")[0].split(":")
      start_datetime = DateTime.new(date[0].to_i, date[1].to_i, date[2].to_i, start_at[0].to_i, start_at[1].to_i, 0, "+09:00")
      end_datetime = DateTime.new(date[0].to_i, date[1].to_i, date[2].to_i, end_at[0].to_i, end_at[1].to_i, 0, "+09:00")
      # Customer
      if reservation_params[:is_select_customer] == true
        customer = Customer.find(reservation_params[:customer_id])
      else
        customer = Customer.new
      end
      customer.account_id = current_merchant_user.account.id
      customer.first_name = reservation_params[:first_name]
      customer.last_name = reservation_params[:last_name]
      customer.first_name_kana = reservation_params[:first_name_kana]
      customer.last_name_kana = reservation_params[:last_name_kana]
      customer.email = reservation_params[:email]
      customer.phone_number = reservation_params[:phone_number]
      customer.notes = reservation_params[:notes]
      customer.save!
      # create reservation
      Reservation.create!(reserve_frame_id: reservation_params[:reserve_frame_id],
                          start_at: start_datetime,
                          status: 'confirm',
                          end_at: end_datetime,
                          price: reservation_params[:price],
                          number_of_people: reservation_params[:number_of_people],
                          representative_first_name: reservation_params[:first_name],
                          representative_last_name: reservation_params[:last_name],
                          customer_id: customer.id)
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def register_reservation_info
    account = current_merchant_user.account
    reserve_frames = account.reserve_frames
    customers = JSON.parse(account.customers.to_json(methods: [:full_name]))
    render json: { status: 'success', reserve_frames: reserve_frames, customers: customers }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def reservation_params
    params.require(:reservations)
          .permit(:id,
                  :last_name,
                  :first_name,
                  :first_name_kana,
                  :last_name_kana,
                  :email,
                  :phone_number,
                  :notes,
                  :reserve_frame_id,
                  :date,
                  :time,
                  :start_time,
                  :end_time,
                  :reservation_date,
                  :start_at,
                  :end_at,
                  :number_of_people,
                  :end_user_id,
                  :customer_id,
                  :type,
                  :payment_method,
                  :reserve_count,
                  :consume_number,
                  :ticket_id,
                  :ticket_master_id,
                  :monthly_payment_plan_id,
                  :price,
                  :status,
                  :is_select_customer)
  end
end
