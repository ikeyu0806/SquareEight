class DropReserveFrameAccountImageRelation < ActiveRecord::Migration[7.0]
  def up
    drop_table :reserve_frame_image_relations
  end

  def down
    fail ActiveRecord::IrreversibleMigration
  end
end
