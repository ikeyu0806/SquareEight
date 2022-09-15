class CreateStripePaymentIntents < ActiveRecord::Migration[7.0]
  def change
    create_table :stripe_payment_intents do |t|
      t.integer :amount, null: false
      t.string :currency, default: 'jpy'
      t.string :stripe_payment_intent_id, null: false
      t.string :stripe_payment_method_id
      t.string :stripe_customer_id, null: false
      t.string :transfer_destination_account_id
      t.integer :application_fee_amount
      t.string :purchase_product_name
      t.string :order_date
      t.integer :product_id
      t.integer :ticket_master_id
      t.integer :reserve_frame_id
      t.integer :monthly_payment_plan_id
      t.integer :system_product_type
      t.integer :end_user_id
      t.integer :account_id

      t.timestamps
    end
  end
end
