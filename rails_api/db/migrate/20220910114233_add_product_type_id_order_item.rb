class AddProductTypeIdOrderItem < ActiveRecord::Migration[7.0]
  def up
    add_column :order_items, :product_type_id, :integer
  end

  def down
    remove_column :order_items, :product_type_id, :integer
  end
end
