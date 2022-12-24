class Api::Internal::SendLineSchedulesController < ApplicationController
  before_action :merchant_login_only!

  def index
    send_mail_schedules = current_merchant_user.account.send_mail_schedules.order(scheduled_datetime: :desc)
    send_mail_schedules = JSON.parse(send_mail_schedules.to_json(methods: [:display_scheduled_datetime, :customer_fullname, :past_flg, :parsed_message_body]))
    render json: { status: 'success', send_mail_schedules: send_mail_schedules }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def create
    scheduled_datetime = Time.zone.parse("#{send_line_schedules_params[:scheduled_date]} #{send_line_schedules_params[:scheduled_time]}")
  
    title = customer_params[:mail_title]
    price = ''
    payment_request_url = ''
  
    case send_line_schedules_params[:send_target_type]
    when 'customer'
      customer = Customer.find_by(public_id: send_line_schedules_params[:customer_public_id])

      if customer_params[:is_send_payment_request]
        price = customer_params[:price]
        stripe_payment_request = current_merchant_user.account
                                 .stripe_payment_requests
                                 .create!(name: customer_params[:payment_request_name],
                                          price: price,
                                          customer_id: customer.id,
                                          send_method: 'Email')
        payment_request_url = ENV["FRONTEND_URL"] + '/payment_request/' + stripe_payment_request.public_id
      end

      content = MessageTemplate.convert_content(send_line_schedules_params[:message_body], customer.last_name, customer.first_name, price, payment_request_url)
      current_merchant_user.account.send_mail_schedules.create!(
        merchant_user_id: current_merchant_user.id,
        customer_id: customer.id,
        scheduled_datetime: scheduled_datetime,
        email: customer.email,
        mail_title: mail_title,
        message_body: message_body,
        message_template_type: send_line_schedules_params[:message_template_type],
        html_template_type: html_template_type,
      )
    when 'customerGroup'
      customer_group = CustomerGroup.find_by(public_id: send_line_schedules_params[:customer_group_public_id])
      customer_group.customers.each do |customer|
        if customer_params[:is_send_payment_request]
          price = customer_params[:price]
          stripe_payment_request = current_merchant_user.account
                                   .stripe_payment_requests
                                   .create!(name: customer_params[:payment_request_name],
                                            price: price,
                                            customer_id: customer.id,
                                            send_method: 'Email')
          payment_request_url = ENV["FRONTEND_URL"] + '/payment_request/' + stripe_payment_request.public_id
        end

        content = MessageTemplate.convert_content(send_line_schedules_params[:message_body], customer.last_name, customer.first_name, price, payment_request_url)
        current_merchant_user.account.send_mail_schedules.create!(
        merchant_user_id: current_merchant_user.id,
        customer_id: customer.id,
        scheduled_datetime: scheduled_datetime,
        email: customer.email,
        mail_title: mail_title,
        message_body: message_body,
        message_template_type: send_line_schedules_params[:message_template_type],
        html_template_type: html_template_type,
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
                  :payment_request_name)
  end
end
