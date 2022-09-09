class Api::Internal::ReservationsController < ApplicationController
  def create
    ActiveRecord::Base.transaction do
      reserve_frame = ReserveFrame.find(reservation_params[:reserve_frame_id])
      # ステータス
      case reserve_frame.reception_type
      when 'Immediate'
        status = 'confirm'
        # 定員オーバチェック
        capacity = reserve_frame.capacity
        date = reservation_params[:date].split("-")
        start_at = reservation_params[:time].split("-")[0].split(":")
        end_at = reservation_params[:time].split("-")[1].split(":")
        start_datetime = DateTime.new(date[0].to_i, date[1].to_i, date[2].to_i, start_at[0].to_i, start_at[1].to_i)
        end_datetime = DateTime.new(date[0].to_i, date[1].to_i, date[2].to_i, end_at[0].to_i, end_at[1].to_i)
        reserved_count = reserve_frame.reservations.where(start_at: start_datetime, end_at: end_datetime).count
        # リソースチェック
        resources = reserve_frame.resources
        resources.each do |resource|
          quantity = resource.quantity
          reservation_count = resource.reservations.where(start_at: start_datetime, end_at: end_datetime).count
          raise '定員オーバです' if quantity <= reservation_count
        end
        # 確定
        reservation = reserve_frame
        .reservations
        .create!(number_of_people: reservation_params[:reserve_count],
                 price: reservation_params[:price],
                 start_at: start_datetime,
                 end_at: end_datetime,
                 status: status,
                 representative_first_name: reservation_params[:first_name],
                 representative_last_name: reservation_params[:last_name],
                 payment_method: reservation_params[:payment_method],
                 ticket_master_id: reservation_params[:ticket_id],
                 monthly_payment_plan_id: reservation_params[:monthly_payment_plan_id],
                 ticket_consume_number: reservation_params[:consume_number].to_i,
                 end_user_id: current_end_user.present? ? current_end_user.id : nil)
      when 'Temporary'
        status = 'pendingVerifivation'
      else
        raise 'reserveFrame reception type invalid'
      end

      # 顧客ID登録
      # 同じ携帯電話番号の顧客データがなければ作成
      customer = reserve_frame.account.customers.find_by(phone_number: reservation_params[:phone_number])
      if customer.blank?
        customer = reserve_frame
                   .account
                   .customers
                   .create!(first_name: reservation_params[:first_name],
                            last_name: reservation_params[:last_name],
                            email: reservation_params[:email],
                            phone_number: reservation_params[:phone_number])
        reservation.update!(customer_id: customer.id)
      else
        reservation.update!(customer_id: customer.id)
      end

      # 支払い実行
      if reserve_frame.reception_type  == "Immediate" && reserve_frame.is_set_price?
        case reservation_params[:payment_method]
        when 'creditCardPayment'
          raise 'ログインしてください' if current_end_user.blank?
          # 決済
          Stripe.api_key = Rails.configuration.stripe[:secret_key]
          stripe_customer = Stripe::Customer.retrieve(current_end_user.stripe_customer_id)
          default_payment_method_id = stripe_customer["invoice_settings"]["default_payment_method"]
          commission = (reservation_params[:price].to_i * 0.04).to_i
          payment_intent = Stripe::PaymentIntent.create({
            amount: reservation_params[:price],
            currency: 'jpy',
            payment_method_types: ['card'],
            payment_method: default_payment_method_id,
            customer: current_end_user.stripe_customer_id,
            application_fee_amount: commission,
            metadata: {
              'order_date': current_date_text,
              'account_business_name': reserve_frame.account.business_name,
              'name': reserve_frame.title,
              'price': reservation_params[:price],
              'product_type': 'reservation'
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
          order.order_items.new(product_type: 'Product',
                                account_id: reserve_frame.account.id,
                                reservation_id: reservation.id,
                                product_name: reserve_frame.title,
                                price: reservation_params[:price],
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
          raise 'チケットが足りません' if total_remain_number < reservation_params[:consume_number].to_i
          reservation_params[:consume_number].to_i.times do |count|
            purchased_ticket = purchased_tickets.where("remain_number > ?", 0).first
            purchased_ticket.update!(remain_number: purchased_ticket.remain_number - 1)
          end
        when 'monthlyPaymentPlan'
          is_subscribe_plan = current_end_user.search_stripe_subscriptions.pluck("metadata")&.pluck("monthly_payment_plan_id")
          raise 'プランに加入していません' unless is_subscribe_plan
        else
        end
      end

      if current_end_user.present?
        # 顧客データ作成
        customer = current_end_user.customers.find_or_initialize_by(account_id: reserve_frame.account_id)
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
      end
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
  
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def reservation_params
    params.require(:reservations)
          .permit(:id,
                  :last_name,
                  :first_name,
                  :email,
                  :phone_number,
                  :reserve_frame_id,
                  :date,
                  :time,
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
                  :monthly_payment_plan_id,
                  :price)
  end
end
