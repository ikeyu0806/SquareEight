class Api::Internal::DeliveryDatetimeSettingsController < ApplicationController
  before_action :merchant_login_only!

  def register
    binding.pry
  end

  private

  def delivery_datetime_setting_params
    params.require(:delivery_datetime_setting)
          .permit(:id,
                  :shortest_delivery_day,
                  :longest_delivery_day,
                  :deadline_time,
                  :is_set_per_area_delivery_date,
                  :is_holiday_sun,
                  :is_holiday_mon,
                  :is_holiday_tue,
                  :is_holiday_wed,
                  :is_holiday_thu,
                  :is_holiday_fri,
                  :is_holiday_sat,
                  :delivery_time_type,
                  delivery_datetime_temporary_holidays: [:delivery_holiday],
                  custom_delivery_times: [:delivery_time],
                  target_products: [:id]
                  )
  end
end
