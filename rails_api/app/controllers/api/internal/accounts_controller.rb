class Api::Internal::AccountsController < ApplicationController
  before_action :login_only!

  def register_stripe_customer
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    customer = Stripe::Customer.create({
      source: account_params[:card_token],
    })
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def account_params
    params.require(:account).permit(:id, :token)
  end
end
