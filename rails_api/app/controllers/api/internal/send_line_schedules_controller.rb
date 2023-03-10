class Api::Internal::SendLineSchedulesController < ApplicationController
  before_action :merchant_login_only!

  def index
    send_line_schedules = current_merchant_user.account.send_line_schedules.order(scheduled_datetime: :desc)
    # ページネーション
    current_page = params[:current_page].to_i
    display_count = params[:display_count].to_i
    last_page, remainder = send_line_schedules.count.divmod(display_count)
    last_page += 1 if remainder.positive?
    send_line_schedules = send_line_schedules.first(current_page * display_count).last(display_count)
    send_line_schedules = JSON.parse(send_line_schedules.to_json(methods: [:display_scheduled_datetime, :customer_fullname, :past_flg, :line_official_account_name, :line_user_display_name]))
    render json: { status: 'success',
                   send_line_schedules: send_line_schedules,
                   last_page: last_page }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def create
    scheduled_datetime = Time.zone.parse("#{send_line_schedules_params[:scheduled_date]} #{send_line_schedules_params[:scheduled_time]}")
    line_official_account = LineOfficialAccount.find_by(public_id: send_line_schedules_params[:selected_line_official_account_public_id])

    price = ''
    payment_request_url = ''
  
    case send_line_schedules_params[:send_target_type]
    when 'lineUser'
      line_user = LineUser.find_by(public_id: send_line_schedules_params[:selected_line_user][:public_id])

      customer = line_user.customer

      if customer.blank?
        customer = line_user.customer.create!(
          account_id: current_merchant_user.account.id
        )
      end

      if send_line_schedules_params[:is_send_payment_request]
        price = send_line_schedules_params[:price]
        stripe_payment_request = current_merchant_user.account
                                 .stripe_payment_requests
                                 .create!(name: send_line_schedules_params[:payment_request_name],
                                          price: price,
                                          customer_id: customer.id,
                                          send_method: 'Email')
        payment_request_url = ENV["FRONTEND_URL"] + '/payment_request/' + stripe_payment_request.public_id
      end

      content = MessageTemplate.convert_content(send_line_schedules_params[:message_body], customer.last_name, customer.first_name, price, payment_request_url)
      current_merchant_user.account.send_line_schedules.create!(
        merchant_user_id: current_merchant_user.id,
        scheduled_datetime: scheduled_datetime,
        message: content,
        line_user_id: line_user.id,
        line_official_account_id: line_official_account.id
      )
    when 'lineOfficialAccountAllUser'
      line_official_account.line_users.each do |line_user|
        if send_line_schedules_params[:is_send_payment_request]
          price = send_line_schedules_params[:price]
          stripe_payment_request = current_merchant_user.account
                                   .stripe_payment_requests
                                   .create!(name: send_line_schedules_params[:payment_request_name],
                                            price: price,
                                            send_method: 'Email')
          payment_request_url = ENV["FRONTEND_URL"] + '/payment_request/' + stripe_payment_request.public_id
        end

        customer = line_user.customer

        if customer.blank?
          customer = line_user.customer.create!(
            account_id: current_merchant_user.account.id
          )
        end

        content = MessageTemplate.convert_content(send_line_schedules_params[:message_body], customer.last_name, customer.first_name, price, payment_request_url)

        current_merchant_user.account.send_line_schedules.create!(
          merchant_user_id: current_merchant_user.id,
          scheduled_datetime: scheduled_datetime,
          message: content,
          line_user_id: line_user.id,
          line_official_account_id: line_official_account.id
        )
      end
    else
      raise 'send_target_type is invalid'
    end
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def cancel
    send_line_schedule = SendLineSchedule.find_by(public_id: params[:public_id])
    send_line_schedule.update!(send_status: 'Cancel')
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def send_line_schedules_params
    params.require(:send_line_schedules)
          .permit(:id,
                  :line_user_id,
                  :line_official_account_id,
                  :scheduled_date,
                  :scheduled_time,
                  :message_body,
                  :is_send_payment_request,
                  :price,
                  :payment_request_name,
                  :send_target_type,
                  :selected_line_official_account_public_id,
                  selected_line_user: [:public_id, :line_user_id, :line_display_name, :line_picture_url])
  end
end
