class CartMonthlyPaymentPlan < ApplicationRecord
  include PublicIdModule

  belongs_to :account
  belongs_to :end_user
  belongs_to :monthly_payment_plan
end
