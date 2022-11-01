class AddReservationFrameCancelSettingColumns < ActiveRecord::Migration[7.0]
  def up
    add_column :reserve_frames, :is_accept_cancel, :boolean
    add_column :reserve_frames, :cancel_day_before, :integer
  end

  def down
    remove_column :reserve_frames, :is_accept_cancel, :boolean
    remove_column :reserve_frames, :cancel_day_before, :integer
  end
end
