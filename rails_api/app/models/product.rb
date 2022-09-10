class Product < ApplicationRecord
  belongs_to :account
  has_many :product_types
  has_many :cart_products

  def show_product_type_form
    product_types.present? ? true : false
  end
end
