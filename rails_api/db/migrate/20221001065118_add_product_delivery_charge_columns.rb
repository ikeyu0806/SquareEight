class AddProductDeliveryChargeColumns < ActiveRecord::Migration[7.0]
  def up
    add_column :products, :delivery_charge_type, :integer
    add_column :products, :flat_rate_delivery_charge, :integer
  end

  def down
    remove_column :products, :delivery_charge_type, :integer
    remove_column :products, :flat_rate_delivery_charge, :integer
  end
end
