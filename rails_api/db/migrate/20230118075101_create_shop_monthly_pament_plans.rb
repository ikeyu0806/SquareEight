class CreateShopMonthlyPamentPlans < ActiveRecord::Migration[7.0]
  def change
    create_table :shop_monthly_pament_plans do |t|
      t.string :public_id, null: false
      t.integer :shop_id, null: false
      t.integer :monthly_payment_plan_id, null: false

      t.timestamps
    end
  end
end
