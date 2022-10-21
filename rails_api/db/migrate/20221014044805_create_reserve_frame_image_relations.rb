class CreateReserveFrameImageRelations < ActiveRecord::Migration[7.0]
  def change
    create_table :reserve_frame_image_relations do |t|
      t.integer :account_s3_image_id
      t.integer :reserve_frame_id
      t.integer :relation_status, default: 0
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
