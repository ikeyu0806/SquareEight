class Api::Internal::CustomersController < ApplicationController
  require 'csv'

  before_action :merchant_login_only!

  def show
    customer = Customer.find_by(public_id: params[:public_id])
    customer = JSON.parse(customer.to_json(methods: [:line_display_name, :line_picture_url, :line_user_public_id, :line_user, :full_name]))
    render json: { status: 'success', customer: customer }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def create
    customer = Customer.new(customer_params)
    customer.account_id = current_merchant_user.account_id
    customer.save!
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def send_mail
    customer = Customer.find_by(public_id: params[:public_id])
    account = current_merchant_user.account
    case customer_params[:message_template_type]
    when 'htmlMailTemplate'
      html_mail_template = HtmlMailTemplate.find_by(public_id: customer_params[:selected_html_mail_template][:public_id])
      parsed_content = JSON.parse(html_mail_template.content)
      HtmlMailTemplateMailer.send_mail(customer.email, parsed_content, html_mail_template.mail_title, html_mail_template.template_type).deliver_now
      account.send_mail_histories.create!(
        customer_id: customer.id,
        message_type: 'htmlMailTemplate',
        email: customer.email,
        mail_title: html_mail_template.mail_title,
        message_body: html_mail_template.content,
        merchant_user_id: current_merchant_user.id,
        html_template_type: html_mail_template.template_type
      )
    else
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
        message_type: 'messageTemplate',
        email: customer.email,
        mail_title: title,
        message_body: content,
        merchant_user_id: current_merchant_user.id,
        stripe_payment_request_id: stripe_payment_request&.id
      )
    end

    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def questionnaire_answers
    account = current_merchant_user.account
    customer = Customer.find_by(public_id: params[:customer_public_id])
    answer_contents = account.answer_contents_with_customer(customer.id)
    render json: { status: 'success', answer_contents: answer_contents }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def connect_line_user
    customer = Customer.find_by(public_id: params[:public_id])
    line_user = LineUser.find_by(public_id: customer_params[:line_user_public_id])
    line_user.update!(customer_id: customer.id)
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def csv_import
    CSV.foreach(params['file'], headers: true) do |row|
      row = row.to_hash
      # bulk insertだとvalidationが使えないのでとりあえず普通にinsertする実装
      current_merchant_user.account.customers.create! row
    end
    render json: { status: 'success', errMessage: nil }
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', errMessage: error }, status: 500
  end


  private

  def customer_params
    params.require(:customers)
          .permit(:id,
                  :first_name,
                  :last_name,
                  :first_name_kana,
                  :last_name_kana,
                  :email,
                  :phone_number,
                  :gender,
                  :dob,
                  :notes,
                  :custom_items_answer,
                  :is_send_payment_request,
                  :payment_request_name,
                  :price,
                  :mail_title,
                  :message,
                  :line_user_public_id,
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
