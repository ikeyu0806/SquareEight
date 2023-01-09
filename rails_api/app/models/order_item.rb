class OrderItem < ApplicationRecord
  include PublicIdModule

  # 未読注文有りステータスに更新
  before_create :update_read_orders_status_unread

  enum item_type: { TicketMaster: 0, MonthlyPaymentPlan: 1, Product: 2, Reservation: 3, PaymentRequest: 4 }

  belongs_to :order
  belongs_to :account
  has_one :product_type, foreign_key: :id, primary_key: :product_type_id
  has_one :product, foreign_key: :id, primary_key: :product_id

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

  def product_inventory
    return nil if product.blank?
    product.inventory
  end

  def product_inventory_allocation
    return nil if product.blank?
    product.inventory_allocation
  end

  def product_type_inventory
    return nil if product_type.blank?
    product_type.inventory
  end

  def product_type_inventory_allocation
    return nil if product_type.blank?
    product_type.inventory_allocation
  end

  def update_read_orders_status_unread
    self.account.merchant_users.each do |user|
      user.read_orders_status_UnreadExist!
    end
  end

  def is_product_type_exists
    product_type.present?
  end

  def end_user_name
    order.end_user.full_name
  end
end
