class Api::Internal::PaymentIntentsController < ApplicationController
  before_action :merchant_login_only!

  def refund_payment
    stripe_payment_intent = StripePaymentIntent.find_by(public_id: params[:public_id])
    stripe_payment_intent.refund_payment
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
