class Api::Batch::SendMailSchedulesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def send_same_hour_mail
    current_datetime = Time.zone.now.strftime("%Y%m%d%H")
    send_mail_schedules = SendMailSchedule.select{|t| t.scheduled_datetime&.strftime("%Y%m%d%H") == current_datetime}
    send_mail_schedules.each do |schedule|
      customer = schedule.customer
      case schedule.message_template_type
      when 'htmlMailTemplate'
        parsed_content = JSON.parse(schedule.message_body)
        HtmlMailTemplateMailer.send_mail(customer.email, parsed_content, schedule.mail_title, schedule.html_template_type).deliver_now
        account.send_mail_histories.create!(
          customer_id: customer.id,
          message_type: 'htmlMailTemplate',
          email: customer.email,
          mail_title: schedule.mail_title,
          message_body: schedule.message_body,
          html_template_type: schedule.html_template_type
        )
      else
        payment_request_url = ENV["FRONTEND_URL"] + '/payment_request/' + stripe_payment_request.public_id
        content = MessageTemplate.convert_content(schedule.message_body, customer.last_name, customer.first_name, price, payment_request_url)
        MessageTemplateMailer.send_mail(customer.email, title, content).deliver_now
        account.send_mail_histories.create!(
          customer_id: customer.id,
          message_type: 'messageTemplate',
          email: customer.email,
          mail_title: schedule.mail_title,
          message_body: schedule.message_body,
          stripe_payment_request_id: stripe_payment_request&.id
        )
      end
    end
    render json: { status: 'success', account: account }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
