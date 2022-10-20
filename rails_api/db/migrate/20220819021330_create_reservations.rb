class CreateReservations < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations do |t|
      t.integer :reserve_frame_id, null: false
      t.datetime :start_at, null: false
      t.datetime :end_at
      t.integer :number_of_people, default: 1, null: false
      t.integer :end_user_id
      t.integer :customer_id
      t.integer :status, default: 0
      t.integer :payment_method, default: 0
      t.integer :price
      t.string :representative_first_name
      t.string :representative_last_name
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
