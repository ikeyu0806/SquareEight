class Api::Internal::ReservationsController < ApplicationController
  before_action :merchant_login_only!, except: [:create, :show, :insert_time_payment_method, :confirm, :input_customer_info]

  def insert_time_payment_method
    ActiveRecord::Base.transaction do
      date = reservation_params[:reservation_date].split("-")
      start_at = reservation_params[:time].split("-")[0].split(":")
      end_at = reservation_params[:time].split("-")[1].split(":")

      start_datetime = DateTime.new(date[0].to_i, date[1].to_i, date[2].to_i, start_at[0].to_i, start_at[1].to_i, 0, "+09:00")
      end_datetime = DateTime.new(date[0].to_i, date[1].to_i, date[2].to_i, end_at[0].to_i, end_at[1].to_i, 0, "+09:00")

      reserve_frame = ReserveFrame.find_by(public_id: reservation_params[:reserve_frame_public_id])
      ticket_master = TicketMaster.find_by(id: reservation_params[:ticket_master_id])
      reservation = reserve_frame
      .reservations
      .create!( number_of_people: reservation_params[:reserve_count],
                price: reservation_params[:price],
                start_at: start_datetime,
                end_at: end_datetime,
                status: 'inputTimeWithPaymentMethod',
                payment_method: reservation_params[:payment_method],
                ticket_master_id: ticket_master.id,
                monthly_payment_plan_id: reservation_params[:monthly_payment_plan_id],
                ticket_consume_number: reservation_params[:consume_number].to_i,
                end_user_id: current_end_user.present? ? current_end_user.id : nil)
      if reservation_params[:multi_local_payment_prices].present?
        reservation_params[:multi_local_payment_prices].each do |price_attr|
          next if price_attr[:reserve_number_of_people].blank?
          next unless price_attr[:reserve_number_of_people].positive?
          reservation.reservation_local_payment_prices
          .create!( name: price_attr[:name],
                    reserve_number_of_people: price_attr[:reserve_number_of_people],
                    price: price_attr[:price] * price_attr[:reserve_number_of_people])
        end
      end
      if reservation_params[:multi_credit_card_payment_prices].present?
        reservation_params[:multi_credit_card_payment_prices].each do |price_attr|
          next if price_attr[:reserve_number_of_people].blank?
          next unless price_attr[:reserve_number_of_people].positive?
          reservation.reservation_credit_card_payment_prices
          .create!( name: price_attr[:name],
                    reserve_number_of_people: price_attr[:reserve_number_of_people],
                    price: price_attr[:price] * price_attr[:reserve_number_of_people])
        end
      end

      render json: { status: 'success', reservation: reservation }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def confirm
    ActiveRecord::Base.transaction do
      reservation = Reservation.find_by(public_id: reservation_params[:public_id])
      reserve_frame = reservation.reserve_frame
      account = reserve_frame.account
      monthly_reservation_count = account.reservations.where(start_at: Time.zone.now - 30.days...Time.zone.now).count
      raise "予約受付可能数を超えています" if monthly_reservation_count >= account.reservation_limit
      # 定員、時間帯、リソースを確認して予約可能かvalidation
      validate_result = reserve_frame.validate_reservation(reservation)
      raise validate_result[:error_message] if validate_result[:status] == 'ng'
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
      # アンケート回答登録
      questionnaire_master = reserve_frame.questionnaire_master
      if questionnaire_master.present?
      questionnaire_master.questionnaire_answers
                          .create!( customer_id: customer.id,
                                    title: questionnaire_master.title,
                                    answers_json: reservation_params[:answer].to_json)
      end

      # 確定
      status = if reserve_frame.Lottery?
        'waitingForLotteryConfirm'
      elsif reserve_frame.Immediate?
        'confirm'
      else
        'pendingVerifivation'
      end

      reservation
      .update!( customer_id: customer.id,
                status: status,
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
      reservation.exec_payment(current_end_user)
      # 通知メール
      display_payment_method = reservation.display_payment_method
      display_reservation_datetime = reservation.display_reservation_datetime
      display_status = reservation.display_status
      display_number_of_people, total_price = reservation.display_multi_payment_method_with_number_of_people
      display_price = total_price.present? ? total_price : reservation.display_price
      display_number_of_people = reservation.number_of_people.to_s + '人' if display_number_of_people.blank?
      if reserve_frame.reception_type == 'Immediate' && reservation.customer.email.present?
        ReservationMailer.send_end_user_confirm_mail(reservation.customer.email, "予約を確定しました", reservation.reserve_frame.title, display_reservation_datetime, display_payment_method, display_number_of_people, display_price).deliver_now
      end

      merchant_emails = reserve_frame.account.merchant_users.pluck(:email).join(',')
      ReservationMailer.send_merchant_confirm_mail(merchant_emails, "予約を受け付けました", reservation.id, reserve_frame.id, customer.id, display_reservation_datetime, display_payment_method, display_status, display_price, display_number_of_people).deliver_now

      render json: { status: 'success', reservation: reservation }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def show
    reservation = Reservation.find_by(public_id: params[:public_id])
    reservation = JSON.parse(reservation.to_json(methods: [:reserve_frame_title, 
                                                           :display_payment_method,
                                                           :display_status,
                                                           :lottery_confirmed_day_before_text,
                                                           :display_reservation_datetime,
                                                           :reservation_local_payment_prices,
                                                           :reservation_credit_card_payment_prices]))
    render json: { status: 'success', reservation: reservation }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update_status
    ActiveRecord::Base.transaction do
      reservation = Reservation.find_by(public_id: params[:public_id])
      reservation.update!(status: reservation_params[:status])
      if reservation.customer.email.present?
        display_number_of_people, total_price = reservation.display_multi_payment_method_with_number_of_people
        display_price = total_price.present? ? total_price : reservation.display_price
        display_number_of_people = reservation.number_of_people.to_s + '人' if display_number_of_people.blank?
        ReservationMailer.send_end_user_confirm_mail(reservation.customer.email, "予約を確定しました", reservation.reserve_frame.title, reservation.display_reservation_datetime, reservation.display_payment_method, display_number_of_people, display_price).deliver_now
      end
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
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
        customer = Customer.find_by(public_id: reservation_params[:customer_public_id])
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

      reserve_frame = ReserveFrame.find_by(public_id: reservation_params[:reserve_frame_public_id])
      # create reservation
      Reservation.create!(reserve_frame_id: reserve_frame.id,
                          start_at: start_datetime,
                          status: 'confirm',
                          end_at: end_datetime,
                          price: reservation_params[:price],
                          number_of_people: reservation_params[:number_of_people],
                          representative_first_name: reservation_params[:first_name],
                          representative_last_name: reservation_params[:last_name],
                          customer_id: customer.id)
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def register_reservation_info
    account = current_merchant_user.account
    reserve_frames = account.reserve_frames
    customers = JSON.parse(account.customers.to_json(methods: [:full_name]))
    render json: { status: 'success', reserve_frames: reserve_frames, customers: customers }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def input_customer_info
    login_status = current_end_user.present? ? 'Login' : 'Logout'
    # 共通ヘッダ、フッタ
    reservation = Reservation.find_by(public_id: params[:reservation_public_id])
    reserve_frame = reservation.reserve_frame
    shared_component = reserve_frame.account.shared_component
    if current_end_user.present? && current_end_user.stripe_customer_id.present?
      default_payment_method_id, payment_methods = current_end_user.payment_methods
      purchased_ticket_ids = current_end_user.purchased_ticket_ids
      is_subscribe_plan = current_end_user.search_stripe_subscriptions.pluck("metadata")&.pluck("monthly_payment_plan_id").include?(params[:monthly_payment_plan_id])
      is_purchase_ticket = current_end_user.purchased_tickets.pluck(:ticket_master_id).include?(params[:ticket_id].to_i)
      subscribe_plan_ids = []
    else
      default_payment_method_id = nil
      payment_methods = []
      purchased_ticket_ids = []
      is_subscribe_plan = false
      is_purchase_ticket = false
    end

    end_user = current_end_user.attributes.except(:password_digest, :stripe_customer_id) if current_end_user.present?

    date = reservation.start_at.strftime("%Y-%m-%d")
    time = reservation.start_at.strftime("%H:%M") + "-" + reservation.end_at.strftime("%H:%M")

    payment_method = reservation.payment_method
    # ActiveRecordのインスタンスではなくなるので最後にJSONにする
    reservation = JSON.parse(reservation.to_json(methods: [:reservation_local_payment_prices, :reservation_credit_card_payment_prices, :ticket_master_public_id]))
    reserve_frame = JSON.parse(reserve_frame.to_json(methods: [:parse_question_form_json]))
    render json: { status: 'success',
                   end_user: end_user,
                   date: date,
                   time: time,
                   shared_component: shared_component,
                   reserve_frame: reserve_frame,
                   reservation: reservation,
                   stripe_default_payment_method_id: default_payment_method_id,
                   stripe_payment_methods: payment_methods,
                   payment_method: payment_method,
                   purchased_ticket_ids: purchased_ticket_ids,
                   is_subscribe_plan: is_subscribe_plan,
                   is_purchase_ticket: is_purchase_ticket,
                   login_status: login_status }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def cancel
    reservation = Reservation.find_by(public_id: params[:public_id])
    reservation.update!(status: 'cancel')
    customer = reservation.customer
    # swal2のcheckboxにチェックを入れると"1"になる
    if params[:send_mail] == "1" && customer.email.present?
      ReservationMailer.cancel_mail_to_customer(reservation.id, customer.id).deliver_now
    end
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def reservation_params
    params.require(:reservations)
          .permit(:id,
                  :reserve_frame_public_id,
                  :public_id,
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
                  :customer_public_id,
                  :type,
                  :payment_method,
                  :reserve_count,
                  :consume_number,
                  :ticket_id,
                  :ticket_master_id,
                  :ticket_master_public_id,
                  :monthly_payment_plan_id,
                  :price,
                  :status,
                  :is_select_customer,
                  answer: [:question, :answer],
                  multi_local_payment_prices: [:name, :price, :reserve_number_of_people],
                  multi_credit_card_payment_prices: [:name, :price, :reserve_number_of_people])
  end
end
