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

  def cart_contents
    cart_items = []
    total_price = 0
    cart_products.each do |cart|
      merge_destination_item = cart_items.find{|item| item[:parent_product_id] == cart.product.id}
      if merge_destination_item.blank?
        cart_items.push({
          id: cart.id,
          product_name: cart.product.name,
          price: cart.product.price * cart.quantity,
          tax_rate: cart.product.tax_rate,
          quantity: cart.quantity,
          s3_object_public_url: cart.product.s3_object_public_url,
          business_name: cart.account.business_name,
          product_type: 'Product',
          parent_product_id: cart.product.id
        })
        total_price += cart.product.price
      else
        merge_destination_item[:price] = merge_destination_item[:price] += cart.product.price * cart.quantity
        merge_destination_item[:quantity] = merge_destination_item[:price] += cart.quantity
      end
    end
    cart_ticket_masters.each do |cart|
      cart_items.push({
        id: cart.id,
        product_name: cart.ticket_master.name,
        price: cart.ticket_master.price * cart.quantity,
        effective_month: cart.ticket_master.effective_month,
        quantity: cart.quantity,
        s3_object_public_url: cart.ticket_master.s3_object_public_url,
        is_expired: cart.ticket_master.effective_month.positive? ? false : true,
        business_name: cart.account.business_name,
        product_type: 'TicketMaster',
        parent_ticket_master_id: cart.ticket_master.id
      })
      total_price += cart.ticket_master.price
    end
    cart_monthly_payment_plans.each do |cart|
      cart_items.push({
        id: cart.id,
        product_name: cart.monthly_payment_plan.plan_text,
        price: cart.monthly_payment_plan.price,
        s3_object_public_url: cart.monthly_payment_plan.s3_object_public_url,
        business_name: cart.account.business_name,
        product_type: 'MonthlyPaymentPlan',
        parent_monthly_payment_plan_id: cart.monthly_payment_plan.id
      })
      total_price += cart.monthly_payment_plan.price
    end
    return cart_items, total_price
  end
end
