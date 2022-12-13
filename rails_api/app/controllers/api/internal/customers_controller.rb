class Api::Internal::CustomersController < ApplicationController
  before_action :merchant_login_only!

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
    title = customer_params[:mail_title]
    if customer_params[:is_send_payment_request]
      price = customer_params[:price]
      stripe_payment_request = current_merchant_user.account.stripe_payment_requests.create!(name: customer_params[:payment_request_name], price: price, customer: customer)
      payment_request_url = ENV["FRONTEND_URL"] + '/payment_request/' + stripe_payment_request.public_id
    end
    content = MessageTemplate.convert_content(customer_params[:message], customer.last_name, customer.first_name)
    MessageTemplateMailer.send_mail(customer.email, title, content).deliver_now
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def questionnaire_answers
    customer = Customer.find_by(public_id: params[:customer_public_id])
    answer_contents = customer.answer_contents
    render json: { status: 'success', answer_contents: answer_contents }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
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
                  :message_template_public_id)
  end
end
