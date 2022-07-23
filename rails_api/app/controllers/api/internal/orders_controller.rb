class Api::Internal::OrdersController < ApplicationController
  def order_items
    order = Order.find(params[:order_id])
    order_items = order.order_items
    render json: { statue: 'success', order_items: order_items }, status: 200
  rescue => e
    render json: { statue: 'fail', error: error }, status: 500
  end
end
