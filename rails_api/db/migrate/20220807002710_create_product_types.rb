class CreateProductTypes < ActiveRecord::Migration[7.0]
  def change
    create_table :product_types do |t|
      t.integer :product_id
      t.string :name
      t.integer :inventory
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
