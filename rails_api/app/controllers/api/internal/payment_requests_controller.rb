class Api::Internal::PaymentRequestsController < ApplicationController
  before_action :merchant_login_only!

  def init_stat
    account = current_merchant_user.account
    customers = account.customers
    customer_groups = account.customer_groups
    message_templates = account.message_templates
    render json: {  status: 'success',
                    customers: customers,
                    customer_groups: customer_groups,
                    message_templates: message_templates }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def send_payment_request_mail
    account = current_merchant_user.account
    case payment_request_params[:target_customer_type]
    when 'registeredCustomer' then
      payment_request_params[:selected_customers].each do |customer|
        stripe_payment_request = account.stripe_payment_requests.create!(price: payment_request_params[:price], customer_id: customer[:id])
        payment_request_url = ENV["FRONTEND_URL"] + '/payment_request/' + stripe_payment_request.id.to_s
        content = MessageTemplate
                  .convert_content(
                    payment_request_params[:content],
                    customer[:last_name],
                    customer[:first_name],
                    payment_request_params[:price],
                    payment_request_url)
        PaymentRequestMailer.payment_request_mail(customer[:email], payment_request_params[:title], content).deliver_later
      end
    when 'targetCustomerCustomer' then
      customer_groups = current_merchant_user.customer_groups.where(id: payment_request_params[:selected_customer_groups].pluck(:id))
      customer_groups.each do |group|
        group.customer.each do |group|
          group.customers.each do |customer|
            stripe_payment_request = account.stripe_payment_requests.create!(price: payment_request_params[:price], customer_id: customer.id)
            payment_request_url = ENV["FRONTEND_URL"] + '/payment_request/' + stripe_payment_request.id.to_s
            content = MessageTemplate
                      .convert_content(
                        message_template_params[:content],
                        customer.last_name,
                        customer.first_name,
                        payment_request_params[:price],
                        payment_request_url)
            PaymentRequestMailer.payment_request_mail(customer.email, payment_request_params[:title], content).deliver_later
          end
        end
      end
    when 'newCustomer' then
      email = customer_params[:email]
      customer = current_merchant_user.customers.create!(customer_params)
      stripe_payment_request = account.stripe_payment_requests.create!(price: payment_request_params[:price], customer_id: customer.id)
      payment_request_url = ENV["FRONTEND_URL"] + '/payment_request/' + stripe_payment_request.id.to_s
      content = MessageTemplate
                .convert_content(
                  message_template_params[:content],
                  target_customer_param[:last_name],
                  target_customer_param[:first_name],
                  payment_request_params[:price],
                  payment_request_url)
      PaymentRequestMailer.payment_request_mail(email, payment_request_params[:title], content).deliver_later
    else
      raise '不正なパラメータです'
    end
    render json: {  status: 'success' }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def payment_request_params
    params.require(:payment_request)
          .permit(:id,
                  :price,
                  :title,
                  :content,
                  :target_customer_type,
                  selected_customer_groups: [:id],
                  selected_customers: [ :id,
                                        :first_name,
                                        :last_name,
                                        :first_name_kana,
                                        :email,
                                        :phone_number,
                                        :gender,
                                        :dob,
                                        :notes ],)
  end

  def customer_params
    params.require(:customers)
          .permit(:id,
                  :first_name,
                  :last_name,
                  :first_name_kana,
                  :email,
                  :phone_number,
                  :gender,
                  :dob,
                  :notes)
  end
end
