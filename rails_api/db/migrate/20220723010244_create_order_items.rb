class CreateOrderItems < ActiveRecord::Migration[7.0]
  def change
    create_table :order_items do |t|
      t.integer :order_id, null: false
      t.integer :account_id, null: false
      t.integer :product_type, null: false
      t.integer :ticket_master_id
      t.integer :monthly_payment_plan_id
      t.string :product_name, null: false
      t.integer :price, null: false
      t.integer :commission, null: false

      t.timestamps
    end
  end
end
