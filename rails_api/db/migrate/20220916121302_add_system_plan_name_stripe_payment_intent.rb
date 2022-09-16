class AddSystemPlanNameStripePaymentIntent < ActiveRecord::Migration[7.0]
  def up
    add_column :stripe_payment_intents, :system_plan_name, :string
  end

  def down
    remove_column :stripe_payment_intents, :system_plan_name, :string
  end
end
