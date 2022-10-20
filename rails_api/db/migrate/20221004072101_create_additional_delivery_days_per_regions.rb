class CreateAdditionalDeliveryDaysPerRegions < ActiveRecord::Migration[7.0]
  def change
    create_table :additional_delivery_days_per_regions do |t|
      t.integer :delivery_datetime_setting_id, null: false
      t.string :region, null: false
      t.integer :additional_delivery_days, default: 0
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
