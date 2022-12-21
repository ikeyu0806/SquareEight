class CreateSendMailSchedules < ActiveRecord::Migration[7.0]
  def change
    create_table :send_mail_schedules do |t|
      t.integer :account_id, null: false
      t.integer :merchant_user_id
      t.integer :customer_id
      t.string :mail_title, null: false
      t.text :mail_body, null: false
      t.datetime :scheduled_datetime, null: false
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
