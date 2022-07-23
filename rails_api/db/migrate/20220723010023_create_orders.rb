class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.integer :end_user_id
      t.integer :customer_id
      t.integer :account_id, null: false
      t.integer :cart_id

      t.timestamps
    end
  end
end
