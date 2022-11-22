class Api::Internal::Account::OrdersController < ApplicationController
  before_action :merchant_login_only!

  def show
    order = Order.find_by(public_id: params[:public_id])
    order_items = JSON.parse(order.order_items.to_json(methods: [:business_name]))
    order = JSON.parse(order.to_json(methods: [:total_price, :total_commission, :product_names, :order_date]))
    render json: { status: 'success', order: order, order_items: order_items }, status: 200
  rescue => e
    render json: { status: 'fail', error: e }, status: 500
  end
end
