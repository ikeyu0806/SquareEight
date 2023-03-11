class CreateReservationPurchasedTicketRelations < ActiveRecord::Migration[7.0]
  def change
    create_table :reservation_purchased_ticket_relations do |t|
      t.string :public_id, null: false
      t.integer :reservation_id, null: false
      t.integer :purchased_ticket_id, null: false
      t.integer :consume_number, default: 1

      t.timestamps
    end
  end
end
