class CreateDeliveryDatetimeSettings < ActiveRecord::Migration[7.0]
  def change
    create_table :delivery_datetime_settings do |t|
      t.integer :shortest_delivery_day
      t.integer :longest_delivery_day
      t.time :deadline_time
      t.boolean :is_set_per_area_delivery_date
      t.boolean :is_holiday_sun, default: false
      t.boolean :is_holiday_mon, default: false
      t.boolean :is_holiday_tue, default: false
      t.boolean :is_holiday_wed, default: false
      t.boolean :is_holiday_thu, default: false
      t.boolean :is_holiday_fri, default: false
      t.boolean :is_holiday_sat, default: false
      t.integer :delivery_time_type

      t.timestamps
    end
  end
end
