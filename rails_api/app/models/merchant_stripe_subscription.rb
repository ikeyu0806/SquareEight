class MerchantStripeSubscription < ApplicationRecord
  include PublicIdModule

  belongs_to :monthly_payment_plan
  belongs_to :end_user

  def monthly_payment_plan_name
    monthly_payment_plan.name
  end

  def account_business_name
    monthly_payment_plan.account.business_name
  end

  def customer_full_name
    "#{end_user.customer.last_name}#{end_user.customer.first_name}"
  end

  def customer_public_id
    end_user.customer.public_id
  end
end
