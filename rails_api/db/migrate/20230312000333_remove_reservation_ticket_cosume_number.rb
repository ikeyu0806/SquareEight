class RemoveReservationTicketCosumeNumber < ActiveRecord::Migration[7.0]
  def up
    remove_column :reservations, :ticket_consume_number, :integer
  end

  def down
    add_column :reservations, :ticket_consume_number, :integer
  end
end
