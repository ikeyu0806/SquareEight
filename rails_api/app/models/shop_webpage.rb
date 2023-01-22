class ShopWebpage < ApplicationRecord
  include PublicIdModule

  belongs_to :shop
  belongs_to :webpage
end
