class Product < ApplicationRecord
  belongs_to :account
  has_many :product_types
  has_many :cart_products
end
