class EndUser < ApplicationRecord
  has_secure_password(validations: false)

  has_many :orders
  has_many :purchased_tickets
  has_many :delivery_targets
  has_many :cart_products
  has_many :cart_monthly_payment_plans
  has_many :cart_ticket_masters
  has_many :customers
  has_many :reservations
  has_many :end_user_notifications
  has_many :stripe_payment_intents
  has_one :customer, foreign_key: :end_user_id, primary_key: :id
  has_many :stripe_subscriptions
  has_many :monthly_payment_plans, through: :stripe_subscriptions

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :password, password: true

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
    Stripe.api_version = '2022-08-01'
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
      merge_destination_item = cart_items.find do |item|
        item[:parent_product_id] == cart.product.id && item[:product_type_id] == cart.product_type_id
      end
      price = cart.product.price * cart.quantity
      if merge_destination_item.blank?
        product = cart.product
        if product.delivery_charge_type == 'perPrefectures'
          prefecture_delivery_charge = product.prefecture_delivery_charge(self.delivery_targets.find_by(is_default: true).state)
        else
          prefecture_delivery_charge = 0
        end
        product.prefecture_delivery_charge(self.delivery_targets.find_by(is_default: true).state)
        cart_items.push({
          id: cart.id,
          product_name: product.name,
          price: price,
          tax_rate: product.tax_rate,
          quantity: cart.quantity,
          s3_object_public_url: product.s3_object_public_url,
          business_name: cart.account.business_name,
          item_type: 'Product',
          show_product_type: cart.show_product_type,
          product_type_name: cart.product_type&.name,
          parent_product_id: product.id,
          product_type_id: cart.product_type_id,
          remaining_inventory: product.inventory,
          delivery_charge_type: product.delivery_charge_type,
          flat_rate_delivery_charge: product.flat_rate_delivery_charge,
          prefecture_delivery_charge: prefecture_delivery_charge
        })
        total_price += price
        total_price += product.flat_rate_delivery_charge if product.delivery_charge_type == 'flatRate'
        total_price += prefecture_delivery_charge 
      else
        merge_destination_item[:price] = merge_destination_item[:price] += price
        merge_destination_item[:quantity] = merge_destination_item[:quantity] += cart.quantity
        total_price += price
      end
    end
    cart_ticket_masters.each do |cart|
      merge_destination_item = cart_items.find{|item| item[:parent_ticket_master_id] == cart.ticket_master.id}
      price = cart.ticket_master.price * cart.quantity
      if merge_destination_item.blank?
        cart_items.push({
          id: cart.id,
          product_name: cart.ticket_master.name,
          price: price,
          issue_number: cart.ticket_master.issue_number * cart.quantity,
          effective_month: cart.ticket_master.effective_month,
          quantity: cart.quantity,
          s3_object_public_url: cart.ticket_master.s3_object_public_url,
          is_expired: cart.ticket_master.effective_month.positive? ? false : true,
          business_name: cart.account.business_name,
          item_type: 'TicketMaster',
          parent_ticket_master_id: cart.ticket_master.id
        })
        total_price += price
      else
        merge_destination_item[:price] = merge_destination_item[:price] += price
        merge_destination_item[:quantity] = merge_destination_item[:quantity] += cart.quantity
        total_price += price
      end
    end

    cart_monthly_payment_plans.each do |cart|
      merge_destination_item = cart_items.find{|item| item[:parent_monthly_payment_plan_id] == cart.monthly_payment_plan.id}
      price = cart.monthly_payment_plan.price
      if merge_destination_item.blank?
        cart_items.push({
          id: cart.id,
          product_name: cart.monthly_payment_plan.plan_text,
          price: cart.monthly_payment_plan.price,
          s3_object_public_url: cart.monthly_payment_plan.s3_object_public_url,
          business_name: cart.account.business_name,
          item_type: 'MonthlyPaymentPlan',
          parent_monthly_payment_plan_id: cart.monthly_payment_plan.id
        })
        total_price += cart.monthly_payment_plan.price
      else
        merge_destination_item[:price] = merge_destination_item[:price] += price
      end
    end
    return cart_items, total_price
  end

  def create_product_purchase_notification(title)
    end_user_notification_url = '/customer_page/order'
    self
    .end_user_notifications
    .create!(title: title, url: end_user_notification_url)
  end

  def purchased_ticket_ids
    purchased_tickets.pluck(:id)
  end


  def full_name
    full_name = ((self.last_name || '') + (self.first_name || ''))
    # 一応名前がない場合の分岐
    full_name.blank? ? '名前が登録されていません' : full_name
  end
end
