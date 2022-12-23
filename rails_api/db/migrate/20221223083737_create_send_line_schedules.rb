class CreateSendLineSchedules < ActiveRecord::Migration[7.0]
  def change
    create_table :send_line_schedules do |t|
      t.string :public_id, null: false
      t.integer :account_id, null: false
      t.integer :merchant_user_id
      t.integer :line_user_id, null: false
      t.integer :line_official_account_id, null: false
      t.string :message, null: false
      t.datetime :scheduled_datetime, null: false
      t.integer :send_status, null: false, default: 0

      t.timestamps
    end
  end
end
