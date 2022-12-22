class Api::Internal::SendMailSchedulesController < ApplicationController
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
    scheduled_datetime = Time.zone.parse("#{send_mail_schedules_params[:scheduled_date]} #{send_mail_schedules_params[:scheduled_time]}")

    case send_mail_schedules_params[:message_template_type]
    when 'notUse', 'messageTemplate'
      mail_title = send_mail_schedules_params[:mail_title]
      message_body = send_mail_schedules_params[:message_body]
    when 'htmlMailTemplate'
      html_mail_template = HtmlMailTemplate.find_by(public_id: send_mail_schedules_params[:selected_html_mail_template][:public_id])
      mail_title = html_mail_template.mail_title
      message_body = html_mail_template.content
      html_template_type =  send_mail_schedules_params[:selected_html_mail_template][:template_type]
    else
      raise 'message_template_type is invalid'
    end

    case send_mail_schedules_params[:send_target_type]
    when 'customer'
      customer = Customer.find_by(public_id: send_mail_schedules_params[:customer_public_id])
      current_merchant_user.account.send_mail_schedules.create!(
        merchant_user_id: current_merchant_user.id,
        customer_id: customer.id,
        scheduled_datetime: scheduled_datetime,
        email: customer.email,
        mail_title: mail_title,
        message_body: message_body,
        message_template_type: send_mail_schedules_params[:message_template_type],
        html_template_type: html_template_type,
      )
    when 'customerGroup'
      customer_group = CustomerGroup.find_by(public_id: send_mail_schedules_params[:customer_group_public_id])
      customer_group.customers.each do |customer|
        current_merchant_user.account.send_mail_schedules.create!(
        merchant_user_id: current_merchant_user.id,
        customer_id: customer.id,
        scheduled_datetime: scheduled_datetime,
        email: customer.email,
        mail_title: mail_title,
        message_body: message_body,
        message_template_type: send_mail_schedules_params[:message_template_type],
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

  def send_mail_schedules_params
    params.require(:send_mail_schedules)
          .permit(:id,
                  :customer_public_id,
                  :customer_group_public_id,
                  :scheduled_date,
                  :scheduled_time,
                  :mail_title,
                  :message_body,
                  :is_send_payment_request,
                  :price,
                  :payment_request_name,
                  :message_template_public_id,
                  :message_template_type,
                  :send_target_type,
                  selected_html_mail_template: [
                    :public_id,
                    :name,
                    :mail_title,
                    :template_type,
                    content: [:image, :base64Image, :text]
                  ])
  end
end
