class ProductType < ApplicationRecord
  include PublicIdModule

  belongs_to :product
end
