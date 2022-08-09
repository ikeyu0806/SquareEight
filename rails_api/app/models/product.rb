class Product < ApplicationRecord
  belongs_to :account
  has_many :product_types
  has_many :cart_products

  def stripe_purchase(end_user, purchase_quantities)
    raise '購入数量が不正な値です' if purchase_quantities < 1
    product.inventory = product.inventory - purchase_quantities
    raise '在庫切れです' if product.inventory.negative?
    customer = Stripe::Customer.retrieve(end_user.stripe_customer_id)
    default_payment_method_id = customer["invoice_settings"]["default_payment_method"]
    commission = (product.price * 0.04).to_i
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    payment_intent = Stripe::PaymentIntent.create({
      amount: product.price,
      currency: 'jpy',
      payment_method_types: ['card'],
      payment_method: default_payment_method_id,
      customer: end_user.stripe_customer_id,
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
    order = end_user.orders.new(account_id: product.account_id)
    order.order_items.new(product_type: 'Product',
                          product_id: product.id,
                          product_name: product.name,
                          price: product.price,
                          commission: commission)
    order.save!
    product.save!
  end
end
