class MerchantStripeSubscription < ApplicationRecord
  has_many :monthly_payment_plans, foreign_key: :id, primary_key: :monthly_payment_plan_id
  has_many :end_users, foreign_key: :id, primary_key: :end_user_id
end
