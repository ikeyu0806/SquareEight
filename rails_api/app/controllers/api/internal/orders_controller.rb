class Api::Internal::OrdersController < ApplicationController
  before_action :end_user_login_only!

  def index
    orders = JSON.parse(current_end_user.orders.order(created_at: :desc).to_json(methods: [:total_price, :total_commission, :product_names, :order_date, :include_product]))
    render json: { statue: 'success', orders: orders }, status: 200
  rescue => e
    render json: { statue: 'fail', error: e }, status: 500
  end

  def show
    order = Order.find_by(public_id: params[:id])
    order_items = JSON.parse(order.order_items.to_json(methods: [:business_name]))
    order = JSON.parse(order.to_json(methods: [:total_price, :total_commission, :product_names, :order_date]))
    render json: { statue: 'success', order: order, order_items: order_items }, status: 200
  rescue => e
    render json: { statue: 'fail', error: e }, status: 500
  end

  def order_items
    order = Order.find_by(public_id: params[:order_id])
    total_price = order.total_price
    total_commission = order.total_commission
    order_items = order.order_items
    render json: { statue: 'success',
                   order: order,
                   order_items: order_items,
                   total_price: total_price,
                   total_commission: total_commission }, status: 200
  rescue => e
    render json: { statue: 'fail', error: e }, status: 500
  end
end
