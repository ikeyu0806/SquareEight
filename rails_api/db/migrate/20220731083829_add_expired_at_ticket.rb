class AddExpiredAtTicket < ActiveRecord::Migration[7.0]
  def up
    add_column :ticket_masters, :is_expired, :boolean
    add_column :ticket_masters, :effective_month, :integer
    add_column :purchased_tickets, :name, :string
  end

  def down
    remove_column :ticket_masters, :is_expired, :boolean
    remove_column :ticket_masters, :effective_month, :integer
    remove_column :purchased_tickets, :name, :string
  end
end
