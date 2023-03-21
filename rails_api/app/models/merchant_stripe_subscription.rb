class MerchantStripeSubscription < ApplicationRecord
  include PublicIdModule
  include SubscriptionProratedPrice

  belongs_to :monthly_payment_plan
  belongs_to :end_user

  def monthly_payment_plan_name
    monthly_payment_plan.name
  end

  def account_business_name
    monthly_payment_plan.account.business_name
  end

  def customer_full_name
    "#{end_user.customer.last_name}#{end_user.customer.first_name}"
  end

  def customer_public_id
    end_user.customer.public_id
  end

  def canceled_at_text
    return '' if canceled_at.blank?
    canceled_at.strftime("%Y/%m/%d")
  end

  def joined_date_text
    created_at.strftime("%Y/%m/%d")
  end

  def monthly_payment_plan_public_id
    monthly_payment_plan.public_id
  end

  def price
    monthly_payment_plan.price
  end

  def stripe_merchant_subscription_metadata
    {
      'account_id': monthly_payment_plan.account_id,
      'end_user_id': end_user.id,
      'monthly_payment_plan_id': monthly_payment_plan.id,
      'price': monthly_payment_plan.price,
      'product_type': 'monthly_payment_plan',
      'purchase_product_name': monthly_payment_plan.name
    }
  end

  def cancel_subscription
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
    stripe_customer = Stripe::Customer.retrieve(end_user.stripe_customer_id)
    default_payment_method_id = stripe_customer["invoice_settings"]["default_payment_method"]
    account = monthly_payment_plan.account
    self.update!(
      canceled_at: Time.zone.now
    )
    amount = prorated_plan_price(self.price)
    commission = (monthly_payment_plan.price * account.application_fee_amount).to_i
    # 日割りで請求
    payment_intent = Stripe::PaymentIntent.create({
      amount: amount,
      currency: 'jpy',
      payment_method_types: ['card'],
      payment_method: default_payment_method_id,
      customer: end_user.stripe_customer_id,
      metadata: stripe_merchant_subscription_metadata,
      application_fee_amount: commission,
      transfer_data: {
        destination: account.stripe_account_id
      }
    })
    Stripe::PaymentIntent.confirm(
      payment_intent.id
    )
  end
end
