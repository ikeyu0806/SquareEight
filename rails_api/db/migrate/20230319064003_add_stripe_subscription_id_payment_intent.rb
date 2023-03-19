class AddStripeSubscriptionIdPaymentIntent < ActiveRecord::Migration[7.0]
  def up
    add_column :stripe_payment_intents, :system_stripe_subscription_id, :integer
    add_column :stripe_payment_intents, :merchant_stripe_subscription_id, :integer
  end

  def down
    remove_column :stripe_payment_intents, :system_stripe_subscription_id, :integer
    remove_column :stripe_payment_intents, :merchant_stripe_subscription_id, :integer
  end
end
