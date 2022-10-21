class ReserveFrameImageRelation < ApplicationRecord
  include PublicIdModule

  enum relation_status: { Main: 0, Sub: 1 }

  belongs_to :account_s3_image
  belongs_to :reserve_frame
end
