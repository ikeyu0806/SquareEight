class Api::Internal::ProductsController < ApplicationController
  before_action :merchant_login_only!

  def create
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end
end
