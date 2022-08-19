class CreateReservations < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations do |t|
      t.integer :reserve_page_id, null: false
      t.datetime :start_at, null: false
      t.datetime :end_at
      t.integer :number_of_people, default: 1, null: false
      t.integer :end_user_id
      t.integer :customer_id
      t.integer :type, default: 0
      t.integer :payment_method, default: 0
      t.integer :price

      t.timestamps
    end
  end
end
