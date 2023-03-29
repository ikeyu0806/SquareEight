class ProductReview < ApplicationRecord
  include PublicIdModule

  belongs_to :end_user
  belongs_to :product
end
