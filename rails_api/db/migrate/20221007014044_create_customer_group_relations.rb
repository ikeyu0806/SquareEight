class CreateCustomerGroupRelations < ActiveRecord::Migration[7.0]
  def change
    create_table :customer_group_relations do |t|
      t.integer :customer_id, null: false
      t.integer :customer_group_id, null: false
      t.string :public_id, null: false
  
      t.timestamps
    end
  end
end
