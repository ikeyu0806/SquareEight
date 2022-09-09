class AddIsSetPriceReserveFrame < ActiveRecord::Migration[7.0]
  def up
    add_column :reserve_frames, :is_set_price, :boolean
  end

  def down
    remove_column :reserve_frames, :is_set_price, :boolean
  end
end
