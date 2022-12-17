class Api::Internal::Account::CustomersController < ApplicationController
  before_action :merchant_login_only!

  def index
    customers = current_merchant_user.account.customers_with_limit.order(:id)
    customers = customers.search(params[:search_word]) if params[:search_word].present?
    line_users = current_merchant_user.account.line_users
    line_official_accounts = current_merchant_user.account.line_official_accounts
    message_templates = current_merchant_user.account.message_templates
    html_mail_templates = current_merchant_user.account.html_mail_templates
    customers = JSON.parse(customers.to_json(methods: [:line_display_name, :line_picture_url, :line_user_public_id]))
    html_template_type = html_mail_templates.first&.template_type || ''
    html_template_content = JSON.parse(html_mail_templates.first&.content) || []
    render json: { status: 'success',
                   customers: customers,
                   line_users: line_users,
                   line_official_accounts: line_official_accounts,
                   message_templates: message_templates,
                   selected_html_template_type: html_template_type,
                   selected_html_template_content: html_template_content }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def create
    current_merchant_user.account.customers.create!(customer_params)
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update
    customer = current_merchant_user.account.customers.find_by(public_id: params[:public_id])
    customer.update!(customer_params)
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def orders
    customer = Customer.find_by(public_id: params[:customer_public_id])
    if customer.end_user.present?
      orders = JSON.parse(customer.end_user.orders.to_json(methods: [:total_price, :total_commission, :product_names, :order_date, :include_product]))
    else
      orders = []
    end
    render json: { status: 'success', orders: orders }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def charges
    customer = Customer.find_by(public_id: params[:customer_public_id])
    stripe_payment_intents = customer.end_user&.stripe_payment_intents
    render json: { status: 'success', stripe_payment_intents: stripe_payment_intents }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def customer_params
    params.require(:customer)
          .permit(:id,
                  :first_name,
                  :last_name,
                  :first_name_kana,
                  :last_name_kana,
                  :email,
                  :notes,
                  :phone_number)
  end
end
