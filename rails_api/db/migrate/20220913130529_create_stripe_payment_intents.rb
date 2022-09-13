class CreateStripePaymentIntents < ActiveRecord::Migration[7.0]
  def change
    create_table :stripe_payment_intents do |t|
      t.integer :amount
      t.string :currency
      t.string :stripe_payment_method_id
      t.string :stripe_customer_id
      t.integer :application_fee_amount
      t.string :order_date
      t.integer :account_id
      t.integer :product_id
      t.integer :ticket_master_id
      t.integer :type
      t.integer :end_user_id

      t.timestamps
    end
  end
end
