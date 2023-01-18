class CreateShopProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :shop_products do |t|
      t.integer :shop_id, null: false
      t.integer :product_id, null: false

      t.timestamps
    end
  end
end
