class Order < ApplicationRecord
  has_one :end_user
  has_many :order_items
end
