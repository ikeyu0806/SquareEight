class CreateSendMailSchedules < ActiveRecord::Migration[7.0]
  def change
    create_table :send_mail_schedules do |t|
      t.integer :account_id, null: false
      t.integer :merchant_user_id
      t.integer :customer_id
      t.string :email, null: false
      t.string :mail_title, null: false
      t.text :message_body, null: false
      t.integer :message_template_type, null: false, default: 0
      t.integer :html_template_type, default: 0
      t.datetime :scheduled_datetime, null: false
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
