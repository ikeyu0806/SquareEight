class Api::Internal::Account::CustomersController < ApplicationController
  before_action :merchant_login_only!

  def index
    customers = current_merchant_user.account.customers_with_limit.order(:id)
    render json: { status: 'success', customers: customers }, status: 200
  rescue => error
    render json: { status: 'fail', error: error }, status: 500
  end

  def create
    current_merchant_user.account.customers.create!(customer_params)
    render json: { status: 'success' }, status: 200
  rescue => error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update
    customer = current_merchant_user.account.customers.find_by(public_id: params[:public_id])
    customer.update!(customer_params)
    render json: { status: 'success' }, status: 200
  rescue => error
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
  rescue => e
    render json: { status: 'fail', error: e }, status: 500
  end

  def charges
    customer = Customer.find_by(public_id: params[:customer_public_id])
    stripe_payment_intents = customer.end_user&.stripe_payment_intents
    render json: { status: 'success', stripe_payment_intents: stripe_payment_intents }, status: 200
  rescue => error
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
