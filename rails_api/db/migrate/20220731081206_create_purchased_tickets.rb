class CreatePurchasedTickets < ActiveRecord::Migration[7.0]
  def change
    create_table :purchased_tickets do |t|
      t.integer :end_user_id
      t.integer :ticket_master_id
      t.integer :remain_number
      t.datetime :expired_at

      t.timestamps
    end
  end
end
