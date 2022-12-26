class AddInventoryAllocationProduct < ActiveRecord::Migration[7.0]
  def up
    add_column :products, :inventory_allocation, :integer, default: 0
  end

  def down
    remove_column :products, :inventory_allocation, :integer, default: 0
  end
end
