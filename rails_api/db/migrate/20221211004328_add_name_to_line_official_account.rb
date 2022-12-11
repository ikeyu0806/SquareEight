class AddNameToLineOfficialAccount < ActiveRecord::Migration[7.0]
  def up
    add_column :line_official_accounts, :name, :string
  end

  def down
    remove_column :line_official_accounts, :name, :string
  end
end
