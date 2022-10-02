class AddOrderDeliveryCharge < ActiveRecord::Migration[7.0]
  def up
    add_column :order_items, :delivery_charge, :integer
  end

  def down
    remove_column :order_items, :delivery_charge, :integer
  end
end
