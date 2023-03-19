class Api::Batch::SystemSubscriptionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def exec_payment
    ActiveRecord::Base.transaction do
      Stripe.api_key = Rails.configuration.stripe[:secret_key]
      Stripe.api_version = '2022-08-01'
      SystemStripeSubscription.each do |subscription|
        account = subscription.account
        payment_intent = Stripe::PaymentIntent.create({
          amount: account.plan_price,
          currency: 'jpy',
          payment_method_types: ['card'],
          customer: account.stripe_customer_id,
          metadata: account.stripe_serivice_plan_subscription_metadata
        })
        Stripe::PaymentIntent.confirm(
          payment_intent.id
        )
      end
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
