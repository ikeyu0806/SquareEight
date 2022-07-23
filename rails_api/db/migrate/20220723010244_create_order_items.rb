class CreateOrderItems < ActiveRecord::Migration[7.0]
  def change
    create_table :order_items do |t|
      t.integer :order_id
      t.integer :product_type
      t.integer :ticket_master_id
      t.integer :monthly_payment_plan_id
      t.integer :product_name
      t.integer :price
      t.integer :commission

      t.timestamps
    end
  end
end
