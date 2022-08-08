class CreateDeliveryTargets < ActiveRecord::Migration[7.0]
  def change
    create_table :delivery_targets do |t|
      t.integer :end_user_id
      t.string :first_name
      t.string :last_name
      t.string :state
      t.string :city
      t.string :town
      t.string :line1
      t.string :line2
      t.string :phone_number

      t.timestamps
    end
  end
end
