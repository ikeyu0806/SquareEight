class AddStripeMccAccount < ActiveRecord::Migration[7.0]
  def up
    add_column :accounts, :mcc, :integer
    add_column :accounts, :mcc_type, :string
  end

  def down
    remove_column :accounts, :mcc, :integer
    remove_column :accounts, :mcc_type, :string
  end
end
