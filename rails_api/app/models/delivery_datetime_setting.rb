class DeliveryDatetimeSetting < ApplicationRecord
  include PublicIdModule

  enum delivery_time_type: { yamato: 0, sagawa: 1, yupack: 2, other: 3 }

  belongs_to :account
  has_many :delivery_datetime_temporary_holidays, dependent: :delete_all
  has_many :custom_delivery_times, dependent: :delete_all
  has_many :additional_delivery_days_per_regions, dependent: :delete_all

  def display_deadline_time
    deadline_time.strftime("%H:%M")
  end

  def display_delivery_datetime_temporary_holidays
    delivery_datetime_temporary_holidays.map { |holiday| holiday.delivery_holiday }
  end

  def display_custom_delivery_times
    result = []
    custom_delivery_times.each do |delivery_time|
      result.push({
        start_at: delivery_time.start_at.strftime("%H:%M"),
        end_at: delivery_time.end_at.strftime("%H:%M")
      })
    end
    result
  end
end
