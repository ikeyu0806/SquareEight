class EndUser < ApplicationRecord
  has_secure_password(validations: false)

  has_many :orders
  has_many :purchased_tickets

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

  def search_stripe_charges
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2020-08-27'
    query = "customer:" + "\'" + self.stripe_customer_id + "\'"
    result = Stripe::Charge.search({query: query, limit: 100})
    JSON.parse(result.to_json)["data"]
  end

  def search_stripe_payment_intents
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2020-08-27'
    query = "customer:" + "\'" + self.stripe_customer_id + "\'"
    result = Stripe::PaymentIntent.search({query: query, limit: 100})
    JSON.parse(result.to_json)["data"]
  end
end
