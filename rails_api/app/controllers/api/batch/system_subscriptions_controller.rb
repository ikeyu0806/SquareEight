class Api::Batch::SystemSubscriptionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def exec_payment
    target_payment_intents = []
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
    # 今日が月末の場合の判定
    if Time.zone.now.end_of_month.day == Time.zone.now.day
      case Time.zone.now.day
      # 今日が月末で28日だったら28, 29,30, 31
      when 28 then
        target_day = [28, 29, 30, 31]
      # 今日が月末で29日だったら29,30, 31
      when 29 then
        target_day = [29, 30, 31]
      # 今日が月末で30日だったら30, 31
      when 30 then
        target_day = [30, 31]
      # 今日が月末で31日だったら31
      when 31 then
        target_day = 31
      end
    else
      target_day = Time.zone.now.day
    end
    SystemStripeSubscription.where(billing_cycle_anchor_day: target_day).each do |subscription|
      next if subscription.last_paid_at.end_of_day.eql?(Time.zone.now.end_of_day)
      account = subscription.account
      payment_intent = Stripe::PaymentIntent.create({
        amount: subscription.prorated_plan_price,
        currency: 'jpy',
        payment_method_types: ['card'],
        customer: account.stripe_customer_id,
        metadata: account.stripe_serivice_plan_subscription_metadata
      })
      Stripe::PaymentIntent.confirm(
        payment_intent.id
      )
      subscription.update!(last_paid_at: Time.zone.now)
      target_payment_intents.push(payment_intent)
    end
    render json: { status: 'success', target_payment_intents: target_payment_intents }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
