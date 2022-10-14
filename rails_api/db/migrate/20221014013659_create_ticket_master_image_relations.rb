class CreateTicketMasterImageRelations < ActiveRecord::Migration[7.0]
  def change
    create_table :ticket_master_image_relations do |t|
      t.integer :account_s3_image_id
      t.integer :ticket_master_id
      t.integer :relation_status, default: 0

      t.timestamps
    end
  end
end
