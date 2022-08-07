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

  def require_address_message
    require_address_colum_messages = []
    require_address_colum_messages.push('郵便番号') if postal_code.blank?
    require_address_colum_messages.push('都道府県') if state.blank?
    require_address_colum_messages.push('都道府県（カナ）') if state_kana.blank?
    require_address_colum_messages.push('区市町村') if city.blank?
    require_address_colum_messages.push('区市町村（カナ）') if city_kana.blank?
    require_address_colum_messages.push('町名（丁目まで）') if town.blank?
    require_address_colum_messages.push('町名（丁目まで、カナ）') if town_kana.blank?
    require_address_colum_messages.push('番地、号') if line1.blank?
    require_address_colum_messages.push('番地、号（カナ）') if line1_kana.blank?
    require_address_colum_messages.join(",")
  end
end
