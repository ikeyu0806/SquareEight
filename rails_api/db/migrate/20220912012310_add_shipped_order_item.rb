class AddShippedOrderItem < ActiveRecord::Migration[7.0]
  def up
    add_column :order_items, :shipped, :boolean, default: false
  end

  def down
    remove_column :order_items, :shipped, :boolean
  end
end
