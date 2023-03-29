class ProductReview < ApplicationRecord
  include PublicIdModule

  enum approval_status: { Unapproved: 0, Approved: 1 }

  belongs_to :end_user
  belongs_to :product
end
