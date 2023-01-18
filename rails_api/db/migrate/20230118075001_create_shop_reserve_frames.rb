class CreateShopReserveFrames < ActiveRecord::Migration[7.0]
  def change
    create_table :shop_reserve_frames do |t|
      t.integer :shop_id, null: false
      t.integer :reserve_frame_id, null: false

      t.timestamps
    end
  end
end
