include SubscriptionBillingModule

class Api::Batch::SystemSubscriptionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def exec_payment
    target_subscriptions = []
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
    # 今日が月末の場合の判定。SubscriptionBillingModuleモジュールから呼び出し
    target_day = billing_target_day
    SystemStripeSubscription.billing_target(target_day).each do |subscription|
      # 今日支払った場合は請求しない
      next if subscription.last_paid_at.end_of_day.eql?(Time.zone.now.end_of_day)
      # 加入した当日の場合は請求しない
      next if subscription.created_at.end_of_day.eql?(Time.zone.now.end_of_day)
      account = subscription.account
      stripe_customer = Stripe::Customer.retrieve(account.stripe_customer_id)
      default_payment_method_id = stripe_customer["invoice_settings"]["default_payment_method"]
      amount = subscription.prorated_plan_price(account.plan_price)
      payment_intent = Stripe::PaymentIntent.create({
        amount: amount,
        currency: 'jpy',
        payment_method_types: ['card'],
        payment_method: default_payment_method_id,
        customer: account.stripe_customer_id,
        metadata: subscription.stripe_serivice_plan_subscription_metadata
      })
      Stripe::PaymentIntent.confirm(
        payment_intent.id
      )
      subscription.update!(last_paid_at: Time.zone.now)
      target_subscriptions.push(
        {
          payment_intent_id: payment_intent.id,
          amount: amount,
          account_id: account.id,
          stripe_customer_id: account.stripe_customer_id
        }
      )
    end
    render json: { status: 'success', target_subscriptions: target_subscriptions }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
