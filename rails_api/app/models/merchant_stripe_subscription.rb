class MerchantStripeSubscription < ApplicationRecord
  belongs_to :monthly_payment_plan
  belongs_to :end_user

  def monthly_payment_plan_name
    monthly_payment_plan.name
  end

  def account_business_name
    monthly_payment_plan.account.business_name
  end
end
