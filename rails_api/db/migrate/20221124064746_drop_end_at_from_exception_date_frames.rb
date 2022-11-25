class DropEndAtFromExceptionDateFrames < ActiveRecord::Migration[7.0]
  def up
    remove_column :unreservable_frames, :end_at, :datetime
    remove_column :out_of_range_frames, :end_at, :datetime
  end

  def down
    add_column :unreservable_frames, :end_at, :datetime
    add_column :out_of_range_frames, :end_at, :datetime
  end
end
