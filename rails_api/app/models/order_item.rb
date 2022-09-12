class OrderItem < ApplicationRecord
  enum item_type: { TicketMaster: 0, MonthlyPaymentPlan: 1, Product: 2, Reservation: 3 }

  belongs_to :order
  belongs_to :account
  has_one :product_type, foreign_key: :id, primary_key: :product_type_id

  def business_name
    account.business_name
  end

  def address
    order.address
  end

  def postal_code
    order.postal_code
  end

  def order_name
    order.name
  end
end
