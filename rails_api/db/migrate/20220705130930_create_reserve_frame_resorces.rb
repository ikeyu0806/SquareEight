class CreateReserveFrameResorces < ActiveRecord::Migration[7.0]
  def change
    create_table :reserve_frame_resorces do |t|
      t.integer :reserve_frame_id
      t.integer :resource_id
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
