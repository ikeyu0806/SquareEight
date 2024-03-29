class CreateReserveFrames < ActiveRecord::Migration[7.0]
  def change
    create_table :reserve_frames do |t|
      t.integer :account_id, null: false
      t.datetime :start_at, null: false
      t.string :title, null: false
      t.text :description
      t.boolean :is_repeat, null: false
      t.integer :repeat_interval_type
      t.integer :repeat_interval_number_day
      t.integer :repeat_interval_number_week
      t.integer :repeat_interval_number_month
      t.integer :repeat_interval_month_date
      t.datetime :repeat_end_date
      t.integer :capacity, default: 1, null: false
      t.integer :local_payment_price
      t.integer :publish_status, default: 0
      t.integer :reception_type, default: 0
      t.integer :reception_start_day_before
      t.integer :reception_deadline, default: 0
      t.integer :reception_deadline_hour_before
      t.integer :reception_deadline_day_before
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
