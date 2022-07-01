class AddAccountIdMonthlyPaymentPlans < ActiveRecord::Migration[7.0]
  def up
    add_column :monthly_payment_plans, :account_id, :integer
  end

  def down
    remove_column :monthly_payment_plans, :account_id, :integer
  end
end
