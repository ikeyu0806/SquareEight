class DeliveryDatetimeSetting < ApplicationRecord
  enum delivery_time_type: { yamato: 0, sagawa: 1, yupack: 2, other: 3 }

  has_many :delivery_datetime_temporary_holidays
  has_many :custom_delivery_times

  def display_deadline_time
    deadline_time.strftime("%H:%M")
  end
end
