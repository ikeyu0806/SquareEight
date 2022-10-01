class Product < ApplicationRecord
  belongs_to :account
  has_many :product_types
  has_many :cart_products
  has_many :shipping_fee_per_regions

  enum publish_status: { Unpublish: 0, Publish: 1 }

  scope :enabled, -> { where(deleted_at: nil) }

  def show_product_type_form
    product_types.present? ? true : false
  end

  def logical_delete
    update!(deleted_at: Time.zone.now)
  end
end
