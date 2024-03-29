class Api::Internal::DeliveryDatetimeSettingsController < ApplicationController
  before_action :merchant_login_only!

  def index
    delivery_datetime_setting = current_merchant_user.account.delivery_datetime_setting
    products = delivery_datetime_setting.account.products
    delivery_datetime_setting = JSON.parse(delivery_datetime_setting.to_json(methods: [:display_delivery_datetime_temporary_holidays,
                                                                                       :additional_delivery_days_per_regions,
                                                                                       :custom_delivery_times,
                                                                                       :display_custom_delivery_times,
                                                                                       :display_deadline_time]))
    render json: { status: 'success',
                   products: products,
                   delivery_datetime_setting: delivery_datetime_setting }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def register
    delivery_datetime_setting = current_merchant_user.account.delivery_datetime_setting
    delivery_datetime_setting = DeliveryDatetimeSetting.new(account_id: current_merchant_user.account.id) if delivery_datetime_setting.blank?
    delivery_datetime_setting_attributes = delivery_datetime_setting_params
                                           .except(:delivery_datetime_temporary_holidays,
                                                   :additional_delivery_days_per_region,
                                                   :custom_delivery_times,
                                                   :target_products,
                                                   :deadline_time,
                                                   :products)

    delivery_datetime_setting.attributes = delivery_datetime_setting_attributes
    deadline_time = delivery_datetime_setting_params[:deadline_time].split(":")
    deadline_time = DateTime.new(2000, 01, 01, deadline_time[0].to_i, deadline_time[1].to_i, 0, "+09:00")
    delivery_datetime_setting.deadline_time = deadline_time
    # 都道府県別追加お届け日数
    delivery_datetime_setting.additional_delivery_days_per_regions.delete_all
    delivery_datetime_setting_params[:additional_delivery_days_per_region].each do |additional_delivery_day|
      delivery_datetime_setting.additional_delivery_days_per_regions.new(region: additional_delivery_day[:region], additional_delivery_days: additional_delivery_day[:additional_delivery_days])
    end
    # 臨時休業日設定
    if delivery_datetime_setting_params[:delivery_datetime_temporary_holidays].present?
      delivery_datetime_setting.delivery_datetime_temporary_holidays.delete_all
      delivery_datetime_setting_params[:delivery_datetime_temporary_holidays].each do |holiday|
        holiday = holiday.split("-")
        holiday = DateTime.new(holiday[0].to_i, holiday[1].to_i, holiday[2].to_i, 0, 0, 0, "+09:00")
        delivery_datetime_setting.delivery_datetime_temporary_holidays.new(delivery_holiday: holiday)
      end
    end
    # 配送時間の時間区分を自分で設定する場合の設定
    if delivery_datetime_setting_params[:delivery_time_type] == 'other' && delivery_datetime_setting_params[:custom_delivery_times].present?
      delivery_datetime_setting.custom_delivery_times.delete_all
      delivery_datetime_setting_params[:custom_delivery_times].each do |delivery_time|
        delivery_datetime_setting.custom_delivery_times.new(start_at: delivery_time["start_at"], end_at: delivery_time["end_at"])
      end
    end

    # 対象商品更新
    target_product_ids = delivery_datetime_setting_params[:products].select{ |product| product[:delivery_datetime_target_flg] == true }.pluck(:id)
    no_target_product_ids = delivery_datetime_setting_params[:products].select{ |product| product[:delivery_datetime_target_flg] == false }.pluck(:id)
    products = current_merchant_user.account.products
    products.where(id: target_product_ids).update_all(delivery_datetime_target_flg: true)
    products.where(id: no_target_product_ids).update_all(delivery_datetime_target_flg: false)

    delivery_datetime_setting.save!
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
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
                  products: [:id, :name, :delivery_datetime_target_flg],
                  delivery_datetime_temporary_holidays: [],
                  custom_delivery_times: [:start_at, :end_at],
                  additional_delivery_days_per_region: [:region, :additional_delivery_days],
                  target_products: []
                  )
  end
end
