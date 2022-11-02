class AddReservationFrameCancelSettingColumns < ActiveRecord::Migration[7.0]
  def up
    add_column :reserve_frames, :is_accept_cancel, :boolean, default: false
    add_column :reserve_frames, :is_accept_cancel_on_the_day, :boolean, default: false
    add_column :reserve_frames, :cancel_reception_day_before, :integer
    add_column :reserve_frames, :cancel_reception_hour_before, :integer
  end

  def down
    remove_column :reserve_frames, :is_accept_cancel, :boolean, default: false
    remove_column :reserve_frames, :is_accept_cancel_on_the_day, :boolean, default: false
    remove_column :reserve_frames, :cancel_reception_day_before, :integer
    remove_column :reserve_frames, :cancel_reception_hour_before, :integer
  end
end
