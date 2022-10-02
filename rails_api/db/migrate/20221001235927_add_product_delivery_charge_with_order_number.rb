class AddProductDeliveryChargeWithOrderNumber < ActiveRecord::Migration[7.0]
  def up
    add_column :products, :delivery_charge_with_order_number, :integer, default: 0
  end

  def down
    remove_column :products, :delivery_charge_with_order_number, :integer
  end
end
