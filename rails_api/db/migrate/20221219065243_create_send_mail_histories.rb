class CreateSendMailHistories < ActiveRecord::Migration[7.0]
  def change
    create_table :send_mail_histories do |t|
      t.integer :account_id
      t.integer :customer_id
      t.integer :message_type
      t.string :email
      t.string :mail_title
      t.text :message_body
      t.datetime :send_at
      t.integer :merchant_user_id
      t.integer :stripe_payment_request_id

      t.timestamps
    end
  end
end
