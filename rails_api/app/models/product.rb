class Product < ApplicationRecord
  belongs_to :account
  has_many :product_types
end
