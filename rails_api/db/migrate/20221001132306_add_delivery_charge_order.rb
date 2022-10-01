class AddDeliveryChargeOrder < ActiveRecord::Migration[7.0]
  def up
    add_column :orders, :delivery_charge, :integer
  end

  def down
    remove_column :orders, :delivery_charge, :integer
  end
end
