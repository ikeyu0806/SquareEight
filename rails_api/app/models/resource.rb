class Resource < ApplicationRecord
  has_many :reserve_frame_resorces
  has_many :reserve_frames, through: :reserve_frame_resorces
  has_many :reservations, through: :reserve_frames
  enum reception_time_setting: { NotSet: 0, AccountBusinessHour: 1, ResourceBusinessHour: 2 }

  def remaining_capacity_count(start_datetime, end_datetime)
    reservation_count = self.reservations.where(start_at: start_datetime, end_at: end_datetime).count
    return self.quantity - reservation_count
  end
end
