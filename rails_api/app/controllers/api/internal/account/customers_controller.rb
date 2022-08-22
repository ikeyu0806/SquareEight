class Api::Internal::Account::CustomersController < ApplicationController
  before_action :merchant_login_only!

  def index
    customers = current_merchant_user.account.customers
    render json: { status: 'success', customers: customers }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end
end
