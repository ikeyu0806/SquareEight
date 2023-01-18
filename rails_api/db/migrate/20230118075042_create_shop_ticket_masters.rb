class CreateShopTicketMasters < ActiveRecord::Migration[7.0]
  def change
    create_table :shop_ticket_masters do |t|
      t.integer :shop_id, null: false
      t.integer :ticket_master_id, null: false

      t.timestamps
    end
  end
end
