class Api::Internal::DeliveryDatetimeSettingsController < ApplicationController
  before_action :merchant_login_only!

  def register
    delivery_datetime_setting = current_merchant_user.account.delivery_datetime_setting
    delivery_datetime_setting = DeliveryDatetimeSetting.new(account_id: current_merchant_user.account.id) if delivery_datetime_setting.blank?
    delivery_datetime_setting_attributes = delivery_datetime_setting_params
                                           .except(:delivery_datetime_temporary_holidays,
                                                   :custom_delivery_times, :target_products,
                                                   :deadline_time)
    delivery_datetime_setting.attributes = delivery_datetime_setting_attributes
    delivery_datetime_setting.save!
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { status: 'fail', error: error }, status: 500
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
