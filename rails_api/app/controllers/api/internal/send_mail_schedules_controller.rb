class Api::Internal::SendMailSchedulesController < ApplicationController
  before_action :merchant_login_only!

  def index
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def create
    binding.pry
    customer = Customer.find_by(public_id: send_mail_schedules_params[:customer_public_id])
    scheduled_datetime = Time.zone.parse("#{send_mail_schedules_params[:scheduled_date]} #{send_mail_schedules_params[:scheduled_time]}")
    current_merchant_user.account.send_mail_schedules.create!(
      merchant_user_id: current_merchant_user.id,
      customer_id: customer.id,
      scheduled_datetime: scheduled_datetime,
      email: customer.email,
      message_body: send_mail_schedules_params[:message_body],
      message_type: send_mail_schedules_params[:message_type],
      html_template_type: send_mail_schedules_params[:html_template_type],
    )
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def send_mail_schedules_params
    params.require(:send_mail_schedules)
          .permit(:id,
                  :customer_public_id,
                  :scheduled_date,
                  :scheduled_time,
                  :mail_title,
                  :message_body,
                  :is_send_payment_request,
                  :price,
                  :payment_request_name,
                  :message_template_public_id,
                  :selected_html_mail_template,
                  :message_template_type)
  end
end
