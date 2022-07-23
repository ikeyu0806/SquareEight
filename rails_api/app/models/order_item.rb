class OrderItem < ApplicationRecord
  enum product_type: { TicketMaster: 0, MonthlyPaymentPlan: 1 }

  belongs_to :order
end
