class AddRefundAtStripePaymentIntent < ActiveRecord::Migration[7.0]
  def up
    add_column :stripe_payment_intents, :refund_at, :datetime
  end

  def down
    remove_column :stripe_payment_intents, :refund_at, :datetime
  end
end
