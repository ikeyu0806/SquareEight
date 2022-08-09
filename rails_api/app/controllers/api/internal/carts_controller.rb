class Api::Internal::CartsController < ApplicationController
  before_action :end_user_login_only!

  def account_index
    cart_items = current_end_user.cart_items(params[:account_id])
    render json: { status: 'success', cart_items: cart_items }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def purchase
    ActiveRecord::Base.transaction do
      # 商品購入
      current_end_user.cart_products.each do |cart|
        product = cart.product
        product.stripe_purchase(current_end_user, product_params[:purchase_quantities])
      end
      render json: { status: 'success', cart_items: cart_items }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def cart_params
    params.require(:cart)
          .permit(:id)
  end
end
