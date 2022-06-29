class CreateMonthlyPaymentPlans < ActiveRecord::Migration[7.0]
  def change
    create_table :monthly_payment_plans do |t|
      t.string :name
      t.integer :price, null: false
      t.boolean :reserve_is_unlimited, default: true
      t.integer :reserve_interval_number
      t.integer :reserve_interval_unit
      t.integer :enable_reserve_count

      t.timestamps
    end
  end
end
