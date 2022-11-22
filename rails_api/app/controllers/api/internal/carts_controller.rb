class Api::Internal::CartsController < ApplicationController
  before_action :end_user_login_only!

  def account_index
    cart_items, total_price = current_end_user.cart_contents
    render json: { status: 'success', cart_items: cart_items, total_price: total_price }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def delete_cart_item
    case params[:item_type]
    when 'Product'
      cart_item = CartProduct.find_by(public_id: params[:public_id])
    when 'TicketMaster'
      cart_item = CartTicketMaster.find_by(public_id: params[:public_id])
    when 'MonthlyPaymentPlan'
      cart_item = CartMonthlyPaymentPlan.find_by(public_id: params[:public_id])
    else
      raise
    end
    cart_item.destroy
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def cart_params
    params.require(:cart)
          .permit(:id)
  end
end
