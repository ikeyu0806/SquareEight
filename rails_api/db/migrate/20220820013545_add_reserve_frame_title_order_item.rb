class AddReserveFrameTitleOrderItem < ActiveRecord::Migration[7.0]
  def up
    add_column :order_items, :reservation_id, :integer
  end

  def down
    remove_column :order_items, :reservation_id, :integer
  end
end
