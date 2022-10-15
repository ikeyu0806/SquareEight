class MerchantStripeSubscription < ApplicationRecord
  belongs_to :monthly_payment_plan
  belongs_to :end_user

  def monthly_payment_plan_name
    monthly_payment_plan.name
  end

  def account_name
    monthly_payment_plan.account.name
  end
end
