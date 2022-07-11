class ReserveFrameMonthlyPaymentPlan < ApplicationRecord
  belongs_to :reserve_frame
  belongs_to :monthly_payment_plan
end
