class CreateCustomDeliveryTimes < ActiveRecord::Migration[7.0]
  def change
    create_table :custom_delivery_times do |t|
      t.integer :account_id
      t.string :delivery_time

      t.timestamps
    end
  end
end
