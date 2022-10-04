class DeliveryDatetimeSetting < ApplicationRecord
  enum delivery_time_type: { yamato: 0, sagawa: 1, yupack: 2, other: 3 }

  has_many :delivery_datetime_temporary_holidays
  has_many :custom_delivery_times
  has_many :additional_delivery_days_per_regions

  def display_deadline_time
    deadline_time.strftime("%H:%M")
  end

  def display_delivery_datetime_temporary_holidays
    delivery_datetime_temporary_holidays.map { |holiday| holiday.delivery_holiday }
  end
end
