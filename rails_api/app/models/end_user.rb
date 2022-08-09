class EndUser < ApplicationRecord
  has_secure_password(validations: false)

  has_many :orders
  has_many :purchased_tickets
  has_many :delivery_targets
  has_many :cart_products
  has_many :cart_monthly_payment_plans
  has_many :cart_ticket_masters

  def payment_methods
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    if self.stripe_customer_id.present?
      customer = Stripe::Customer.retrieve(self.stripe_customer_id)
      default_payment_method_id = customer["invoice_settings"]["default_payment_method"]
      payment_methods = Stripe::Customer.list_payment_methods(
        self.stripe_customer_id,
        {type: 'card'},
      )
      payment_methods = payment_methods["data"].map{ |data| JSON.parse(data.to_json) }
    else
      default_payment_method_id = nil
      payment_methods = []
    end
    return default_payment_method_id, payment_methods
  end

  def search_stripe_payment_intents
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2020-08-27'
    query = "customer:" + "\'" + self.stripe_customer_id + "\'"
    result = Stripe::PaymentIntent.search({query: query, limit: 100})
    JSON.parse(result.to_json)["data"]
  end

  def search_stripe_subscriptions
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
    query = 'metadata["customer"]:' + "\'" + self.stripe_customer_id + "\'"
    result = Stripe::Subscription.search({query: query, limit: 100})
    JSON.parse(result.to_json)["data"]
  end

  def default_delivery_target
    delivery_targets&.find_by(is_default: true)
  end

  def cart_items
    result = []
    cart_products.each do |cart|
      result.push({
        id: cart.id,
        product_name: cart.product.name,
        price: cart.product.price,
        tax_rate: cart.product.tax_rate,
        quantity: cart.quantity,
        s3_object_public_url: cart.product.s3_object_public_url,
        product_type: 'Product'
      })
    end
    result
  end
end
