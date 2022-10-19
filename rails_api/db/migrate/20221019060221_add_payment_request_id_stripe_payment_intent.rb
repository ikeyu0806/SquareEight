class AddPaymentRequestIdStripePaymentIntent < ActiveRecord::Migration[7.0]
  def up
    add_column :stripe_payment_intents, :payment_request_id, :integer
  end

  def down
    remove_column :stripe_payment_intents, :payment_request_id, :integer
  end
end
