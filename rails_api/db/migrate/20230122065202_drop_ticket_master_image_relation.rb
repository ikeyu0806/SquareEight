class DropTicketMasterImageRelation < ActiveRecord::Migration[7.0]
  def up
    drop_table :ticket_master_image_relations
  end

  def down
    fail ActiveRecord::IrreversibleMigration
  end
end
