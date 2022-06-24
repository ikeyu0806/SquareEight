class CreateTicketMasters < ActiveRecord::Migration[7.0]
  def change
    create_table :ticket_masters do |t|
      t.string :name
      t.integer :account_id
      t.integer :issue_number
      t.integer :price

      t.timestamps
    end
  end
end
