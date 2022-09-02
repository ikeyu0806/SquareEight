class AddStripeAccountSubscriptionId < ActiveRecord::Migration[7.0]
  def up
    add_column :accounts, :stripe_subscription_id, :string
  end

  def down
    remove_column :accounts, :stripe_subscription_id, :string
  end
end
