class RemoveStripePlanId < ActiveRecord::Migration[7.0]
  def up
    remove_column :monthly_payment_plans, :stripe_plan_id, :string
  end

  def down
    add_column :monthly_payment_plans, :stripe_plan_id, :string
  end
end
