class AddProductIdOrderItem < ActiveRecord::Migration[7.0]
  def up
    add_column :order_items, :product_id, :integer
  end

  def down
    remove_column :order_items, :product_id, :integer
  end
end
