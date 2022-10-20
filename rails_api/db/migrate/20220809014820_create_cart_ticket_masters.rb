class CreateCartTicketMasters < ActiveRecord::Migration[7.0]
  def change
    create_table :cart_ticket_masters do |t|
      t.integer :account_id
      t.integer :end_user_id
      t.integer :ticket_master_id
      t.integer :quantity
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
