class AddPurchaseNumberPurchasedTicket < ActiveRecord::Migration[7.0]
  def up
    add_column :purchased_tickets, :purchased_number, :integer, default: 0
  end

  def down
    remove_column :purchased_tickets, :purchased_number, :integer, default: 0
  end
end
