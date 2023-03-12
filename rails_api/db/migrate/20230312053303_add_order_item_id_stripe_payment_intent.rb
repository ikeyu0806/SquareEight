class AddOrderItemIdStripePaymentIntent < ActiveRecord::Migration[7.0]
  def up
    add_column :stripe_payment_intents, :order_item_id, :integer
  end

  def down
    remove_column :stripe_payment_intents, :order_item_id, :integer
  end
end
