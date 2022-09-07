class Api::Internal::Account::OrdersController < ApplicationController
  before_action :merchant_login_only!

  def show
    order = Order.find(params[:id])
    order_items = JSON.parse(order.order_items.to_json(methods: [:business_name]))
    order = JSON.parse(order.to_json(methods: [:total_price, :total_commission, :product_names, :order_date]))
    render json: { statue: 'success', order: order, order_items: order_items }, status: 200
  rescue => e
    render json: { statue: 'fail', error: e }, status: 500
  end
end
