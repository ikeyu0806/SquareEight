class CreateProductImageRelations < ActiveRecord::Migration[7.0]
  def change
    create_table :product_image_relations do |t|
      t.integer :account_s3_image_id
      t.integer :product_id
      t.integer :relation_status, default: 0
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
