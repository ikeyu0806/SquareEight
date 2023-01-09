class Api::Internal::OrderItemsController < ApplicationController
  before_action :merchant_login_only!

  def index
    order_items = current_merchant_user.account.order_items.order(:id)
    order_items = order_items.to_json(
      methods: [:address,
                :postal_code,
                :order_name,
                :product_inventory,
                :product_inventory_allocation,
                :product_type_inventory,
                :product_type_inventory_allocation,
                :is_product_type_exists,
                :end_user_name])
    order_items = JSON.parse(order_items)
    render json: { status: 'success', order_items: order_items }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update_shipped
    ActiveRecord::Base.transaction do
      order_item = OrderItem.find_by(public_id: params[:public_id])
      order_item.update!(shipped: true)
      if order_item.is_product_type_exists
        product_type = order_item.product_type
        product_type.update!(
          inventory: product_type.inventory - product_type.inventory_allocation,
          inventory_allocation: 0
        )
      else
        product = order_item.product
        product.update!(
          inventory: product.inventory - product.inventory_allocation,
          inventory_allocation: 0
        )
      end
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
