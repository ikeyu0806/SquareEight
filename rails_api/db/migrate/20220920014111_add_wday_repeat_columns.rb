class AddWdayRepeatColumns < ActiveRecord::Migration[7.0]
  def up
    add_column :reserve_frames, :is_repeat_sun, :boolean, default: false
    add_column :reserve_frames, :is_repeat_mon, :boolean, default: false
    add_column :reserve_frames, :is_repeat_tue, :boolean, default: false
    add_column :reserve_frames, :is_repeat_wed, :boolean, default: false
    add_column :reserve_frames, :is_repeat_thu, :boolean, default: false
    add_column :reserve_frames, :is_repeat_fri, :boolean, default: false
    add_column :reserve_frames, :is_repeat_sat, :boolean, default: false
  end

  def down
    remove_column :reserve_frames, :is_repeat_sun, :boolean
    remove_column :reserve_frames, :is_repeat_mon, :boolean
    remove_column :reserve_frames, :is_repeat_tue, :boolean
    remove_column :reserve_frames, :is_repeat_wed, :boolean
    remove_column :reserve_frames, :is_repeat_thu, :boolean
    remove_column :reserve_frames, :is_repeat_fri, :boolean
    remove_column :reserve_frames, :is_repeat_sat, :boolean
  end
end
