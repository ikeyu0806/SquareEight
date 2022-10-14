class MonthlyPaymentPlanImageRelation < ApplicationRecord
  enum relation_status: { Main: 0, Sub: 1 }

  belongs_to :account_s3_image
  belongs_to :monthly_payment_plan
end
