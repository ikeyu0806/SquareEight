class AddDeletedAtShop < ActiveRecord::Migration[7.0]
  def up
    add_column :shops, :deleted_at, :datetime
  end

  def down
    remove_column :shops, :deleted_at, :datetime
  end
end
