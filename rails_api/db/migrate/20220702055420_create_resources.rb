class CreateResources < ActiveRecord::Migration[7.0]
  def change
    create_table :resources do |t|
      t.integer :account_id, null: false
      t.string :name, null: false
      t.integer :quantity, null: false

      t.timestamps
    end
  end
end
