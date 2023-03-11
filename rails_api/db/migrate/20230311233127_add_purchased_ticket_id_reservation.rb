class AddPurchasedTicketIdReservation < ActiveRecord::Migration[7.0]
  def up
    add_column :reservations, :purchased_ticket_id, :integer
  end

  def down
    remove_column :reservations, :purchased_ticket_id, :integer
  end
end
