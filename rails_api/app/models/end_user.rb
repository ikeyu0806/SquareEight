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
end
