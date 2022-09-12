class Api::Internal::OrderItemsController < ApplicationController
  before_action :merchant_login_only!

  def index
    order_items = current_merchant_user.account.order_items
    order_items = JSON.parse(order_items.to_json(methods: [:address, :postal_code, :order_name]))
    render json: { status: 'success', order_items: order_items }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update_shipped
    order_item = OrderItem.find(params[:id])
    order_item.update!(shipped: true)
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end
end
