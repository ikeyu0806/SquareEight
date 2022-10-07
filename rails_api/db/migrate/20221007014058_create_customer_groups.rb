class CreateCustomerGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :customer_groups do |t|
      t.integer :account_id, null: false
      t.string :name, null: false
      t.integer :category, null: false, default: 0

      t.timestamps
    end
  end
end
