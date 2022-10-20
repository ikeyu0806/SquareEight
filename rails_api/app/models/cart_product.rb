class CartProduct < ApplicationRecord
  include PublicIdModule

  belongs_to :account
  belongs_to :end_user
  belongs_to :product
  has_one :product_type, foreign_key: :id, primary_key: :product_type_id

  def show_product_type
    product_type_id.present? && product_type_id.positive?
  end
end
