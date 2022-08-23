class Api::Internal::Account::CustomersController < ApplicationController
  before_action :merchant_login_only!

  def index
    customers = current_merchant_user.account.customers.order(:id)
    render json: { status: 'success', customers: customers }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    current_merchant_user.account.customers.create!(customer_params)
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update
    customer = current_merchant_user.account.customers.find(params[:id])
    customer.update!(customer_params)
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
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
                  :phone_number)
  end
end
