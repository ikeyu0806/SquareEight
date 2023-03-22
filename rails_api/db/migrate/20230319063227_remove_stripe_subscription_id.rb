class RemoveStripeSubscriptionId < ActiveRecord::Migration[7.0]
  def up
    remove_column :system_stripe_subscriptions, :stripe_subscription_id, :string, null: false
    remove_column :merchant_stripe_subscriptions, :stripe_subscription_id, :string, null: false
  end

  def down
    add_column :system_stripe_subscriptions, :stripe_subscription_id, :string, null: false
    add_column :merchant_stripe_subscriptions, :stripe_subscription_id, :string, null: false
  end
end
