class Api::Internal::Account::StripePaymentIntentsController < ApplicationController
  before_action :merchant_login_only!

  def system_plan_subscription_payments

  end
end
