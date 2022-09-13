class CreateStripePaymentIntents < ActiveRecord::Migration[7.0]
  def change
    create_table :stripe_payment_intents do |t|
      t.integer :amount, null: false
      t.string :currency, default: 'jpy'
      t.string :stripe_payment_method_id, null: false
      t.string :stripe_customer_id, null: false
      t.integer :application_fee_amount, null: false
      t.string :order_date, null: false
      t.integer :account_id
      t.integer :product_id
      t.integer :ticket_master_id
      t.integer :type, null: false
      t.integer :end_user_id
      t.integer :payer_type, null: false

      t.timestamps
    end
  end
end
