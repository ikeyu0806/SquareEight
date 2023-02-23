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

  def billing_cycle_anchor_day
    "毎月#{billing_cycle_anchor_datetime&.day}日"
  end

  def canceled_at_text
    return nil if canceled_at.blank?
    canceled_at.strftime("%Y/%m/%d")
  end

  def joined_date_text
    created_at.strftime("%Y/%m/%d")
  end
end
