class ShippingFeePerRegion < ApplicationRecord
  belongs_to :product

  validates :region, presence: true
  validates :shipping_fee, presence: true
end
