class Product < ApplicationRecord
  belongs_to :account
  has_many :product_types
  has_many :cart_products
  has_many :shipping_fee_per_regions

  enum publish_status: { Unpublish: 0, Publish: 1 }
  enum delivery_charge_type: { noSetting: 0, flatRate: 1, perPrefectures: 2 }
  enum delivery_charge_with_order_number: { nationwideUniform: 0, withOrderNumber: 1 }

  scope :enabled, -> { where(deleted_at: nil) }

  def show_product_type_form
    product_types.present? ? true : false
  end

  def logical_delete
    update!(deleted_at: Time.zone.now)
  end

  def prefecture_delivery_charge(state)
    shipping_fee_per_regions.find_by(region: state).shipping_fee
  end
end
