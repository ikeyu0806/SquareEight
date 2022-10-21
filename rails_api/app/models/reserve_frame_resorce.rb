class ReserveFrameResorce < ApplicationRecord
  include PublicIdModule

  belongs_to :reserve_frame
  belongs_to :resource
end
