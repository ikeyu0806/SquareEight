class CreateOutOfRangeFrames < ActiveRecord::Migration[7.0]
  def change
    create_table :out_of_range_frames do |t|
      t.integer :reserve_frame_id
      t.datetime :start_at
      t.datetime :end_at

      t.timestamps
    end
  end
end
