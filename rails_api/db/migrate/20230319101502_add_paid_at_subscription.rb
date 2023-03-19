class AddPaidAtSubscription < ActiveRecord::Migration[7.0]
  def up
    add_column :system_stripe_subscriptions, :last_paid_at, :datetime
    add_column :merchant_stripe_subscriptions, :last_paid_at, :datetime
  end

  def down
    remove_column :system_stripe_subscriptions, :last_paid_at, :datetime
    remove_column :merchant_stripe_subscriptions, :last_paid_at, :datetime
  end
end
