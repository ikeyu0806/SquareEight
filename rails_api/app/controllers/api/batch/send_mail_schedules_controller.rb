class Api::Batch::SendMailSchedulesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def send_same_hour_schedules
    current_datetime = Time.zone.now.strftime("%Y%m%d%H")
    send_mail_schedules = SendMailSchedule.where(send_status: 'Incomplete').select{|t| t.scheduled_datetime&.strftime("%Y%m%d%H") == current_datetime}
    send_mail_schedules.each do |schedule|
      customer = schedule.customer
      case schedule.message_template_type
      when 'htmlMailTemplate'
        parsed_content = JSON.parse(schedule.message_body)
        HtmlMailTemplateMailer.send_mail(customer.email, parsed_content, schedule.mail_title, schedule.html_template_type).deliver_now
      else
        stripe_payment_request = schedule.stripe_payment_request
        payment_request_url = if stripe_payment_request.present?
          ENV["FRONTEND_URL"] + '/payment_request/' + stripe_payment_request.public_id
        else
          ''
        end
        price = stripe_payment_request.present? ? stripe_payment_request.price : 0
        content = MessageTemplate.convert_content(schedule.message_body, customer.last_name, customer.first_name, price, payment_request_url)
        MessageTemplateMailer.send_mail(customer.email, schedule.mail_title, content).deliver_now
      end
      schedule.update!(send_status: 'Complete')
    end
    render json: { status: 'success', account: account }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
