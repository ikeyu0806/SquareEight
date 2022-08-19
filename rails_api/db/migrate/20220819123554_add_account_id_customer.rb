class AddAccountIdCustomer < ActiveRecord::Migration[7.0]
  def up
    add_column :customers, :account_id, :integer, null: false
  end

  def down
    remove_column :customers, :account_id, :integer
  end
end
