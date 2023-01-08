class Api::Internal::OrderItemsController < ApplicationController
  before_action :merchant_login_only!

  def index
    order_items = current_merchant_user.account.order_items.order(:id)
    order_items = JSON.parse(order_items.to_json(methods: [:address, :postal_code, :order_name, :product_inventory, :product_inventory_allocation]))
    render json: { status: 'success', order_items: order_items }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update_shipped
    order_item = OrderItem.find_by(public_id: params[:public_id])
    order_item.update!(shipped: true)
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
