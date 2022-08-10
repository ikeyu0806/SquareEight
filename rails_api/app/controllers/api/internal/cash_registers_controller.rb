class Api::Internal::CashRegistersController < ApplicationController
  before_action :end_user_login_only!

  def index
    default_payment_method_id, payment_methods = current_end_user.payment_methods
    delivery_targets = current_end_user.delivery_targets.order(:id)
    cart_items, total_price = current_end_user.cart_contents
    render json: {  status: 'success',
                    current_end_user_id: current_end_user.id,
                    payment_methods: payment_methods,
                    delivery_targets: delivery_targets,
                    total_price: total_price,
                    cart_items: cart_items,
                    default_payment_method_id: default_payment_method_id, }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end
end
