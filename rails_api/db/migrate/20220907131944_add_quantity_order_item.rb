class AddQuantityOrderItem < ActiveRecord::Migration[7.0]
  def up
    add_column :order_items, :quantity, :integer
  end

  def down
    remove_column :order_items, :quantity, :integer
  end
end
