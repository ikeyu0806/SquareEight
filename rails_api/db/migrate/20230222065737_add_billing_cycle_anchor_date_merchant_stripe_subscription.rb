class AddBillingCycleAnchorDateMerchantStripeSubscription < ActiveRecord::Migration[7.0]
  def up
    add_column :merchant_stripe_subscriptions, :billing_cycle_anchor_datetime, :datetime
  end

  def down
    remove_column :merchant_stripe_subscriptions, :billing_cycle_anchor_datetime, :datetime
  end
end
