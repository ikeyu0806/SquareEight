class ReserveFrameMonthlyPaymentPlan < ApplicationRecord
  include PublicIdModule

  belongs_to :reserve_frame
  belongs_to :monthly_payment_plan
end
