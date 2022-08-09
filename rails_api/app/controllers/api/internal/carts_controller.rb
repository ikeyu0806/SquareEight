class Api::Internal::CartsController < ApplicationController
  before_action :end_user_login_only!

  def account_index
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def cart_params
    params.require(:cart)
          .permit(:id)
  end
end
