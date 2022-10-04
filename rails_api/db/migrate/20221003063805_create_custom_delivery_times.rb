class CreateCustomDeliveryTimes < ActiveRecord::Migration[7.0]
  def change
    create_table :custom_delivery_times do |t|
      t.integer :delivery_datetime_setting_id, null: false
      t.time :start_at
      t.time :end_at

      t.timestamps
    end
  end
end
