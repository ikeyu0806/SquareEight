class CreateReservationLocalPaymentPrices < ActiveRecord::Migration[7.0]
  def change
    create_table :reservation_local_payment_prices do |t|
      t.integer :reservation_id, null: false
      t.string :name, null: false
      t.integer :price, null: false
      t.integer :reserve_number_of_people, null: false

      t.timestamps
    end
  end
end
