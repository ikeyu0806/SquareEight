class AddInventoryAllocationProductType < ActiveRecord::Migration[7.0]
  def up
    add_column :product_types, :inventory_allocation, :integer, default: 0
  end

  def down
    remove_column :product_types, :inventory_allocation, :integer, default: 0
  end
end
