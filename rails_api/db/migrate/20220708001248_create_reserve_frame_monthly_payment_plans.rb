class CreateReserveFrameMonthlyPaymentPlans < ActiveRecord::Migration[7.0]
  def change
    create_table :reserve_frame_monthly_payment_plans do |t|
      t.integer :reserve_frame_id
      t.integer :monthly_payment_plan_id
      t.string :public_id, null: false
  
      t.timestamps
    end
  end
end
