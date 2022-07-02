class AddDescriptionMonthlyPaymentPlans < ActiveRecord::Migration[7.0]
  def up
    add_column :monthly_payment_plans, :description, :text
  end

  def down
    remove_column :monthly_payment_plans, :description, :text
  end
end
