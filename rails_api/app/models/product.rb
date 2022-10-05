class Product < ApplicationRecord
  belongs_to :account
  has_many :product_types
  has_many :cart_products
  has_many :shipping_fee_per_regions, dependent: :delete_all

  enum publish_status: { Unpublish: 0, Publish: 1 }
  enum delivery_charge_type: { noSetting: 0, flatRate: 1, perPrefectures: 2 }
  enum delivery_charge_with_order_number: { nationwideUniform: 0, withOrderNumber: 1 }

  scope :enabled, -> { where(deleted_at: nil) }

  def show_product_type_form
    product_types.present? ? true : false
  end

  def logical_delete
    update!(deleted_at: Time.zone.now)
  end

  def prefecture_delivery_charge(state)
    shipping_fee_per_regions.find_by(region: state).shipping_fee
  end

  # 引数はstate。北海道、東京都とか
  def shippable_date(state)
    result = []
    return [] unless self.delivery_datetime_target_flg
    delivery_datetime_setting = DeliveryDatetimeSetting.find_by(account_id: account.id)
    delivery_datetime_temporary_holidays = delivery_datetime_setting.delivery_datetime_temporary_holidays.pluck(:delivery_holiday)
    # 日曜0から土曜6まで休みの曜日
    holiday_wdays = []
    holiday_wdays.push(0) if delivery_datetime_setting.is_holiday_sun
    holiday_wdays.push(1) if delivery_datetime_setting.is_holiday_mon
    holiday_wdays.push(2) if delivery_datetime_setting.is_holiday_tue
    holiday_wdays.push(3) if delivery_datetime_setting.is_holiday_wed
    holiday_wdays.push(4) if delivery_datetime_setting.is_holiday_thu
    holiday_wdays.push(5) if delivery_datetime_setting.is_holiday_fri
    holiday_wdays.push(6) if delivery_datetime_setting.is_holiday_sat
    # 最短お届け日
    shortest_delivery_day = delivery_datetime_setting.shortest_delivery_day
    # 定休日を飛ばして最短お届け日を計算
    wday_loop_flg = true
    loop_start_date = Date.today
    shortest_delivery_day.times do |i|
      if holiday_wdays.include?(loop_start_date.wday)
        loop_start_date = loop_start_date + 2.days
        next
      end
      if delivery_datetime_temporary_holidays.include?(loop_start_date)
        loop_start_date = loop_start_date + 2.days
        next
      end
      loop_start_date = loop_start_date + 1.days
    end
    while wday_loop_flg
      if holiday_wdays.include?(loop_start_date.wday)
        loop_start_date = loop_start_date + 1.days
        next
      end
      if delivery_datetime_temporary_holidays.include?(loop_start_date)
        loop_start_date = loop_start_date + 1.days
        next
      end
      # ループ終了
      wday_loop_flg = false
    end
    # 都道府県別設定
    if delivery_datetime_setting.is_set_per_area_delivery_date
      additional_day = delivery_datetime_setting.additional_delivery_days_per_regions.find_by(region: state).additional_delivery_days
      loop_start_date = loop_start_date + additional_day.days
    end
    longest_delivery_day = delivery_datetime_setting.longest_delivery_day
    result.push(loop_start_date)
    loop_current_date = loop_start_date
    # 最短お届け日を元に有効な日程を出力
    (shortest_delivery_day..longest_delivery_day).each do |d|
      if holiday_wdays.include?(loop_current_date.wday)
        loop_current_date = loop_current_date + 1.days
        next
      end
      if delivery_datetime_temporary_holidays.include?(loop_current_date)
        loop_current_date = loop_current_date + 1.days
        next
      end
      loop_current_date = loop_current_date + 1.days
      result.push(loop_current_date)
    end
    return result
  end

  def shippable_time
  end
end
