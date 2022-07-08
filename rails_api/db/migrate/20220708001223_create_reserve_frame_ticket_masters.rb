class CreateReserveFrameTicketMasters < ActiveRecord::Migration[7.0]
  def change
    create_table :reserve_frame_ticket_masters do |t|
      t.integer :reserve_frame_id
      t.integer :ticket_master_id
      t.integer :consume_number
      t.timestamps
    end
  end
end
