class CreateShopWebpages < ActiveRecord::Migration[7.0]
  def change
    create_table :shop_webpages do |t|
      t.integer :shop_id, null: false
      t.integer :webpage_id, null: false

      t.timestamps
    end
  end
end
