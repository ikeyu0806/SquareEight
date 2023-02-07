class CreateShopResources < ActiveRecord::Migration[7.0]
  def change
    create_table :shop_resources do |t|
      t.string :public_id, null: false
      t.integer :shop_id, null: false
      t.integer :resource_id, null: false

      t.timestamps
    end
  end
end
