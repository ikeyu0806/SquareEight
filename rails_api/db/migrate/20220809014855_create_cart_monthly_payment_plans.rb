class CreateCartMonthlyPaymentPlans < ActiveRecord::Migration[7.0]
  def change
    create_table :cart_monthly_payment_plans do |t|
      t.integer :account_id
      t.integer :end_user_id
      t.integer :monthly_payment_plan_id
      t.integer :quantity
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
