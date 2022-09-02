class AddDeletedAtAccount < ActiveRecord::Migration[7.0]
  def up
    add_column :accounts, :deleted_at, :datetime
  end

  def down
    remove_column :accounts, :deleted_at, :datetime
  end
end
