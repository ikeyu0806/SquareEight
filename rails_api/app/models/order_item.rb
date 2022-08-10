class OrderItem < ApplicationRecord
  enum product_type: { TicketMaster: 0, MonthlyPaymentPlan: 1, Product: 2 }

  belongs_to :order
  belongs_to :account
end
