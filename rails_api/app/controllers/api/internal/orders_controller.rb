class Api::Internal::OrdersController < ApplicationController
  before_action :end_user_login_only!

  def index
    orders = JSON.parse(current_end_user.orders.to_json(methods: [:total_price, :total_commission, :product_names, :order_date]))
    render json: { statue: 'success', orders: orders }, status: 200
  rescue => e
    render json: { statue: 'fail', error: e }, status: 500
  else

  end

  def order_items
    order = Order.find(params[:order_id])
    total_price = order.total_price
    total_commission = order.total_commission
    render json: { statue: 'success',
                   order_items: order.order_items,
                   total_price: total_price,
                   total_commission: total_commission }, status: 200
  rescue => e
    render json: { statue: 'fail', error: error }, status: 500
  end
end
