class AddWaitForUpdateEmailUser < ActiveRecord::Migration[7.0]
  def up
    add_column :merchant_users, :wait_for_update_email, :string
    add_column :end_users, :wait_for_update_email, :string
  end

  def down
    remove_column :merchant_users, :wait_for_update_email, :string
    remove_column :end_users, :wait_for_update_email, :string
  end
end
