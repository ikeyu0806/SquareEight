class ShopProduct < ApplicationRecord
  include PublicIdModule

  belongs_to :shop
  belongs_to :product
end
