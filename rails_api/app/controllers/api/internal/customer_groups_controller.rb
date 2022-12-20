class Api::Internal::CustomerGroupsController < ApplicationController
  before_action :merchant_login_only!

  def send_mail
    customer_group = CustomerGroup.find_by(public_id: params[:public_id])
    account = current_merchant_user.account
    case customer_params[:message_template_type]
    when 'htmlMailTemplate'
      customer_group.customers.each do |customer|
        html_mail_template = HtmlMailTemplate.find_by(public_id: customer_params[:selected_html_mail_template][:public_id])
        parsed_content = JSON.parse(html_mail_template.content)
        HtmlMailTemplateMailer.send_mail(customer.email, parsed_content, html_mail_template.mail_title, html_mail_template.template_type).deliver_now
        account.send_mail_histories.create!(
          customer_id: customer.id,
          message_type: 'HtmlMailTemplate',
          email: customer.email,
          mail_title: html_mail_template.mail_title,
          message_body: html_mail_template.content,
          merchant_user_id: current_merchant_user.id,
          html_template_type: html_mail_template.template_type
        )
      end
    else
      customer_group.customers.each do |customer|
        title = customer_params[:mail_title]
        price = ''
        payment_request_url = ''
    
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
        content = MessageTemplate.convert_content(customer_params[:message], customer.last_name, customer.first_name, price, payment_request_url)
        MessageTemplateMailer.send_mail(customer.email, title, content).deliver_now
        account.send_mail_histories.create!(
          customer_id: customer.id,
          message_type: 'MessageTemplate',
          email: customer.email,
          mail_title: title,
          message_body: content,
          merchant_user_id: current_merchant_user.id,
          stripe_payment_request_id: stripe_payment_request&.id
        )
      end
    end

    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def customer_params
    params.require(:customer_groups)
          .permit(:id,
                  :public_id,
                  :message_template_public_id,
                  :message_template_type,
                  selected_html_mail_template: [
                    :public_id,
                    :name,
                    :mail_title,
                    :template_type,
                    content: [:image, :base64Image, :text]
                  ])
  end
end
