class ShopResource < ApplicationRecord
  include PublicIdModule

  belongs_to :shop
  belongs_to :resource
end
