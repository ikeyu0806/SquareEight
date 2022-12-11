class AddLineOfficialAccountIdLineUser < ActiveRecord::Migration[7.0]
  def up
    add_column :line_users, :line_official_account_id, :integer, null: false
  end

  def down
    remove_column :line_users, :line_official_account_id, :integer
  end
end
