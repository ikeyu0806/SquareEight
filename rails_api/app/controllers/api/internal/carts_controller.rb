class Api::Internal::CartsController < ApplicationController
  before_action :end_user_login_only!

  def account_index
    cart_items, total_price = current_end_user.cart_contents
    render json: { status: 'success', cart_items: cart_items, total_price: total_price }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def cart_params
    params.require(:cart)
          .permit(:id)
  end
end
