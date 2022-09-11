class OrderItem < ApplicationRecord
  enum type: { TicketMaster: 0, MonthlyPaymentPlan: 1, Product: 2, Reservation: 3 }

  belongs_to :order
  belongs_to :account
  has_one :product_type, foreign_key: :id, primary_key: :product_type_id

  def business_name
    account.business_name
  end

  def type_name
    type&.name
  end
end
