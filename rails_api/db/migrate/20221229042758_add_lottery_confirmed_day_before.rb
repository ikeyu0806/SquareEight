class AddLotteryConfirmedDayBefore < ActiveRecord::Migration[7.0]
  def up
    add_column :reserve_frames, :lottery_confirmed_day, :integer, default: 1
  end

  def down
    remove_column :reserve_frames, :lottery_confirmed_day, :integer, default: 1
  end
end
