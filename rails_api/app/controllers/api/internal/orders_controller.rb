class Api::Internal::OrdersController < ApplicationController
  before_action :end_user_login_only!

  def index
    orders = JSON.parse(current_end_user.orders.order(created_at: :desc).to_json(methods: [:total_price, :total_commission, :product_names, :order_date, :include_product]))
    render json: { status: 'success', orders: orders }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def show
    order = Order.find_by(public_id: params[:public_id])
    order_items = JSON.parse(order.order_items.to_json(methods: [:business_name]))
    order = JSON.parse(order.to_json(methods: [:total_price, :total_commission, :product_names, :order_date]))
    render json: { status: 'success', order: order, order_items: order_items }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def order_items
    order = Order.find_by(public_id: params[:order_public_id])
    total_price = order.total_price
    total_commission = order.total_commission
    order_items = order.order_items
    render json: { status: 'success',
                   order: order,
                   order_items: order_items,
                   total_price: total_price,
                   total_commission: total_commission }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
