class AddOrderItemIdPaymentIntent < ActiveRecord::Migration[7.0]
  def up
    add_column :order_items, :payment_intent_id, :integer
  end

  def down
    remove_column :order_items, :payment_intent_id, :integer
  end
end
