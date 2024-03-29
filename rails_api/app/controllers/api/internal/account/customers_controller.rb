class Api::Internal::Account::CustomersController < ApplicationController
  before_action :merchant_login_only!

  def index
    current_page = params[:current_page].to_i
    display_count = params[:display_count].to_i
    customers = current_merchant_user.account.customers_with_limit.order(:id)
    last_page, remainder = customers.count.divmod(display_count)
    last_page += 1 if remainder.positive?
    customers = customers.search(params[:search_word]) if params[:search_word].present?
    line_users = current_merchant_user.account.line_users
    line_official_accounts = current_merchant_user.account.line_official_accounts
    message_templates = current_merchant_user.account.message_templates
    html_mail_templates = current_merchant_user.account.html_mail_templates
    customers = JSON.parse(customers.first(current_page * display_count).last(display_count).to_json(methods: [:line_display_name, :line_picture_url, :line_user_public_id, :line_user]))
    html_template_content = html_mail_templates.present? ? JSON.parse(html_mail_templates.first.content) : ''
    registered_customers_count = current_merchant_user.account.registered_customers_count
    render json: { status: 'success',
                   customers: customers,
                   last_page: last_page,
                   line_users: line_users,
                   line_official_accounts: line_official_accounts,
                   message_templates: message_templates,
                   html_mail_templates: html_mail_templates,
                   registered_customers_count: registered_customers_count,
                   selected_html_mail_template: html_mail_templates.first || {},
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
    account = current_merchant_user.account
    customer = account.customers.find_by(public_id: params[:customer_public_id])
    end_user = customer.end_user
    if end_user.present?
      order_items = end_user.order_items.where(account_id: account.id)
      order_items = order_items.to_json(
        methods: [:address,
                  :postal_code,
                  :order_name,
                  :product_inventory,
                  :product_inventory_allocation,
                  :product_type_inventory,
                  :product_type_inventory_allocation,
                  :is_product_type_exists,
                  :end_user_name,
                  :customer_public_id])
      order_items = JSON.parse(order_items)
    else
      order_items = []
    end
    render json: { status: 'success', order_items: order_items, customer: customer }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def charges
    account = current_merchant_user.account
    customer = Customer.find_by(public_id: params[:customer_public_id])
    stripe_payment_intents = account.stripe_payment_intents.where(end_user_id: customer&.end_user_id)
    render json: { status: 'success', stripe_payment_intents: stripe_payment_intents, customer: customer }, status: 200
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
