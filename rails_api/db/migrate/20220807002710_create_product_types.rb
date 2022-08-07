class CreateProductTypes < ActiveRecord::Migration[7.0]
  def change
    create_table :product_types do |t|
      t.integer :product_id
      t.string :name
      t.integer :inventory

      t.timestamps
    end
  end
end
