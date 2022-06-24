class CreateTicketMasters < ActiveRecord::Migration[7.0]
  def change
    create_table :ticket_masters do |t|
      t.string :name, comment: 'display nmae'
      t.integer :account_id, comment: 'accountId'
      t.integer :issue_number, comment: 'issue nunmber'
      t.integer :price, comment: 'price'

      t.timestamps
    end
  end
end
