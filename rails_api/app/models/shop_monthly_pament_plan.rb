class ShopMonthlyPamentPlan < ApplicationRecord
  include PublicIdModule

  belongs_to :shop
  belongs_to :monthly_payment_plan
end
