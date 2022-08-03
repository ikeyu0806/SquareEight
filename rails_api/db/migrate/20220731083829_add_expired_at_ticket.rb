class AddExpiredAtTicket < ActiveRecord::Migration[7.0]
  def up
    add_column :ticket_masters, :is_expired, :boolean
    add_column :ticket_masters, :effective_month, :integer
  end

  def down
    remove_column :ticket_masters, :is_expired, :boolean
    remove_column :ticket_masters, :effective_month, :integer
  end
end
