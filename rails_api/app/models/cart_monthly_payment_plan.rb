class CartMonthlyPaymentPlan < ApplicationRecord
  belongs_to :account
  belongs_to :end_user
  belongs_to :monthly_payment_plan
end
