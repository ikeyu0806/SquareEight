class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.integer :end_user_id
      t.integer :customer_id
      t.integer :cart_id
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
