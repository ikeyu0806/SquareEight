class CreateSendMailHistories < ActiveRecord::Migration[7.0]
  def change
    create_table :send_mail_histories do |t|
      t.integer :account_id, null: false
      t.integer :customer_id
      t.integer :message_type, null: false, default: 0
      t.integer :html_template_type, default: 0
      t.string :email, null: false
      t.string :mail_title, null: false
      t.text :message_body, null: false
      t.integer :merchant_user_id
      t.integer :stripe_payment_request_id
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
