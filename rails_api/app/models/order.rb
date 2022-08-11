class Order < ApplicationRecord
  has_one :end_user
  has_many :order_items

  def total_price
    order_items.pluck(:price).inject(:+)
  end

  def total_commission
    order_items.pluck(:commission).inject(:+)
  end

  def product_names
    order_items.pluck(:product_name)
  end

  def order_date
    created_at.strftime("%Y年%m月%d日")
  end

  def include_product
    order_items.pluck(:product_type).include?('Product')
  end

  def set_delivery_target(end_user)
    delivery_target = end_user.default_delivery_target
    self.name = delivery_target.last_name + delivery_target.first_name
    self.postal_code = delivery_target.postal_code
    self.address = delivery_target.state + delivery_target.city + delivery_target.town + delivery_target.line1 + delivery_target.line2
  end
end
