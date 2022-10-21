class UnreservableFrame < ApplicationRecord
  include PublicIdModule

  belongs_to :reserve_frame
end
