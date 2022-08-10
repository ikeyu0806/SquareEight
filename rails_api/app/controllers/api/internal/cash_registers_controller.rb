class Api::Internal::CashRegistersController < ApplicationController
  before_action :end_user_login_only!

  def index
    default_payment_method_id, payment_methods = current_end_user.payment_methods
    delivery_targets = current_end_user.delivery_targets.order(:id)
    cart_items, total_price = current_end_user.cart_contents
    is_require_delivery_targets = cart_items.pluck(:product_type).include?("Product")
    render json: {  status: 'success',
                    current_end_user_id: current_end_user.id,
                    payment_methods: payment_methods,
                    delivery_targets: delivery_targets,
                    is_require_delivery_targets: is_require_delivery_targets,
                    total_price: total_price,
                    cart_items: cart_items,
                    default_payment_method_id: default_payment_method_id, }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def purchase
    order = current_end_user.orders.new
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    ActiveRecord::Base.transaction do
      current_end_user.cart_contents[0].each do |cart|
        case cart[:product_type]
        when 'Product' then
          product = Product.find(cart[:parent_product_id])
          product.inventory = product.inventory - cart[:quantity]
          raise '在庫切れです' if product.inventory.negative?
          customer = Stripe::Customer.retrieve(current_end_user.stripe_customer_id)
          default_payment_method_id = customer["invoice_settings"]["default_payment_method"]
          commission = (cart[:price] * 0.04).to_i
          payment_intent = Stripe::PaymentIntent.create({
            amount: product.price,
            currency: 'jpy',
            payment_method_types: ['card'],
            payment_method: default_payment_method_id,
            customer: current_end_user.stripe_customer_id,
            application_fee_amount: commission,
            metadata: {
              'order_date': current_date_text,
              'account_business_name': product.account.business_name,
              'name': product.name,
              'price': product.price,
              'product_type': 'product'
            },
            transfer_data: {
              destination: product.account.stripe_account_id
            }
          })
          Stripe::PaymentIntent.confirm(
            payment_intent.id
          )
          order.order_items.new(product_type: 'Product',
                                product_id: product.id,
                                product_name: product.name,
                                price: product.price,
                                account_id: product.account.id,
                                commission: commission)
          product.save!
          current_end_user.cart_products.where(product_id: product.id).delete_all
        when 'TicketMaster' then
        when 'MonthlyPaymentPlan' then
        else
          raise '問題が発生しました。'
        end
      end
      order.save!
      render json: { status: 'success', order_id: order.id }, status: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end
end
