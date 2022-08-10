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
end
