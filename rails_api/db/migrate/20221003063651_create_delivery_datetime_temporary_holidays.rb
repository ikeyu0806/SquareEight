class CreateDeliveryDatetimeTemporaryHolidays < ActiveRecord::Migration[7.0]
  def change
    create_table :delivery_datetime_temporary_holidays do |t|
      t.integer :delivery_datetime_setting_id, null: false
      t.date :delivery_holiday
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
