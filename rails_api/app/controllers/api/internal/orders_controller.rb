class Api::Internal::OrdersController < ApplicationController
  def order_items
    order = Order.find(params[:order_id])
    order_items = order.order_items
    total_price = order_items.pluck(:price).inject(:+)
    total_commission = order_items.pluck(:commission).inject(:+)
    render json: { statue: 'success',
                   order_items: order_items,
                   total_price: total_price,
                   total_commission: total_commission }, status: 200
  rescue => e
    render json: { statue: 'fail', error: error }, status: 500
  end
end
