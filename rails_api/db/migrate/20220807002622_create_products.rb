class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.integer :account_id
      t.string :name
      t.integer :price
      t.integer :tax_rate
      t.integer :inventory
      t.text :description

      t.timestamps
    end
  end
end
