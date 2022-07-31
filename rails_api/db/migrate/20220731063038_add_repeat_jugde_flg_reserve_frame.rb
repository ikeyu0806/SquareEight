class AddRepeatJugdeFlgReserveFrame < ActiveRecord::Migration[7.0]
  def up
    add_column :reserve_frames, :is_every_day_repeat, :boolean, default: true
    add_column :reserve_frames, :is_every_week_repeat, :boolean, default: true
    add_column :reserve_frames, :is_every_month_repeat, :boolean, default: true
  end

  def down
    remove_column :reserve_frames, :is_every_day_repeat, :boolean
    remove_column :reserve_frames, :is_every_week_repeat, :boolean
    remove_column :reserve_frames, :is_every_month_repeat, :boolean
  end
end
