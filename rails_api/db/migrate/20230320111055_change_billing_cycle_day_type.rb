class ChangeBillingCycleDayType < ActiveRecord::Migration[7.0]
  def up
    remove_column :system_stripe_subscriptions, :billing_cycle_anchor_datetime, :datetime
    remove_column :merchant_stripe_subscriptions, :billing_cycle_anchor_datetime, :datetime
    add_column :system_stripe_subscriptions, :billing_cycle_anchor_day, :integer
    add_column :merchant_stripe_subscriptions, :billing_cycle_anchor_day, :integer
  end

  def down
    add_column :system_stripe_subscriptions, :billing_cycle_anchor_datetime, :datetime
    add_column :merchant_stripe_subscriptions, :billing_cycle_anchor_datetime, :datetime
    remove_column :system_stripe_subscriptions, :billing_cycle_anchor_day, :integer
    remove_column :merchant_stripe_subscriptions, :billing_cycle_anchor_day, :integer
  end
end
