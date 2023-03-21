include SubscriptionBillingModule

class Api::Batch::MerchantSubscriptionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def exec_payment
    target_subscriptions = []
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
    # 今日が月末の場合の判定。SubscriptionBillingModuleモジュールから呼び出し
    target_day = billing_target_day
    MerchantStripeSubscription.where(billing_cycle_anchor_day: target_day).where(canceled_at: nil).each do |subscription|
      next if subscription.last_paid_at.end_of_day.eql?(Time.zone.now.end_of_day)
      end_user = subscription.end_user
      monthly_payment_plan = subscription.monthly_payment_plan
      account = monthly_payment_plan.account
      amount = subscription.prorated_plan_price(monthly_payment_plan.price)
      commission = (monthly_payment_plan.price * account.application_fee_amount).to_i
      payment_intent = Stripe::PaymentIntent.create({
        amount: amount,
        currency: 'jpy',
        payment_method_types: ['card'],
        customer: end_user.stripe_customer_id,
        metadata: subscription.stripe_merchant_subscription_metadata,
        application_fee_amount: commission,
        transfer_data: {
          destination: account.stripe_account_id
        }
      })
      Stripe::PaymentIntent.confirm(
        payment_intent.id
      )
      subscription.update!(last_paid_at: Time.zone.now)
      target_subscriptions.push(
        {
          payment_intent_id: payment_intent.id,
          amount: amount,
          end_user_id: end_user.id,
          stripe_customer_id: end_user.stripe_customer_id
        }
      )
    end
    render json: { status: 'success', target_subscriptions: target_subscriptions }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
