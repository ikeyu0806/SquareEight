class AddProductTypeIdCartProduct < ActiveRecord::Migration[7.0]
  def up
    add_column :cart_products, :product_type_id, :integer
  end

  def down
    remove_column :cart_products, :product_type_id, :integer
  end
end
