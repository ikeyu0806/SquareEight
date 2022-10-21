class CreateStripePaymentRequests < ActiveRecord::Migration[7.0]
  def change
    create_table :stripe_payment_requests do |t|
      t.integer :account_id, null: false
      t.integer :customer_id
      t.integer :end_user_id
      t.integer :price, null: false
      t.integer :status, default: 0
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
