class CreateDeliveryDatetimeTemporaryHolidays < ActiveRecord::Migration[7.0]
  def change
    create_table :delivery_datetime_temporary_holidays do |t|
      t.date :delivery_holiday

      t.timestamps
    end
  end
end
