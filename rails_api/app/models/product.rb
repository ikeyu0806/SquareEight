class Product < ApplicationRecord
  belongs_to :account
  has_many :product_types
  has_many :cart_products

  enum publish_status: { Unpublish: 0, Publish: 1 }

  scope :enabled, -> { where(deleted_at: nil) }

  def show_product_type_form
    product_types.present? ? true : false
  end
end
