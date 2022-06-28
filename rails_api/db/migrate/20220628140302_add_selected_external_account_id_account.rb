class AddSelectedExternalAccountIdAccount < ActiveRecord::Migration[7.0]
  def up
    add_column :accounts, :selected_external_account_id, :string
  end

  def down
    remove_column :accounts, :selected_external_account_id, :string
  end
end
