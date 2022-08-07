class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.integer :account_id
      t.string :name
      t.integer :price
      t.integer :tax_rage
      t.integer :inventory
      t.text :description
      t.string :s3_object_public_url
      t.string :s3_object_name

      t.timestamps
    end
  end
end
