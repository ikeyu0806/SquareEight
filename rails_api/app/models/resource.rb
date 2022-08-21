class Resource < ApplicationRecord
  has_many :reserve_frame_resorces
  has_many :reserve_frames, through: :reserve_frame_resorces
  has_many :reservations, through: :reserve_frames
  enum reception_time_setting: { NotSet: 0, AccountBusinessHour: 1, ResourceBusinessHour: 2 }
end
