class ShopReserveFrame < ApplicationRecord
  include PublicIdModule

  belongs_to :shop
  belongs_to :reserve_frame
end
