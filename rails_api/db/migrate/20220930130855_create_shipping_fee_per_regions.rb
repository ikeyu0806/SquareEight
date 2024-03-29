class CreateShippingFeePerRegions < ActiveRecord::Migration[7.0]
  def change
    create_table :shipping_fee_per_regions do |t|
      t.integer :product_id, null: false
      t.integer :shipping_fee, null: false
      t.string :region, null: false
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
