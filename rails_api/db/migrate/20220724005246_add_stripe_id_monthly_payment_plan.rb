class AddStripeIdMonthlyPaymentPlan < ActiveRecord::Migration[7.0]
  def up
    add_column :monthly_payment_plans, :stripe_plan_id, :string
  end

  def down
    remove_column :monthly_payment_plans, :stripe_plan_id, :string
  end
end
