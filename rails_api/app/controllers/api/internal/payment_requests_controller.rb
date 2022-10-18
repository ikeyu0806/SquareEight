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
    render json: {  status: 'success' }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def payment_request_params
    params.require(:payment_request)
          .permit(:id,
                  :price,
                  :content,
                  :target_customer_type,
                  selected_customers: [:email],
                  selected_customer_groups: [:id])
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
