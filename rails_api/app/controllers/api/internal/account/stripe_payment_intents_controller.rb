class Api::Internal::Account::StripePaymentIntentsController < ApplicationController
  before_action :merchant_login_only!

  def system_plan_subscription_payments
    system_plan_subscription_payments = current_merchant_user.account.system_plan_subscription_payments
    render json: { status: 'success', system_plan_subscription_payments: system_plan_subscription_payments }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end
end