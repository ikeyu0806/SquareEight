class AddColumnsEndUser < ActiveRecord::Migration[7.0]
  def up
    add_column :end_users, :first_name, :string
    add_column :end_users, :last_name, :string
    add_column :end_users, :first_name_kana, :string
    add_column :end_users, :last_name_kana, :string
  end

  def down
    remove_column :end_users, :first_name, :string
    remove_column :end_users, :last_name, :string
    remove_column :end_users, :first_name_kana, :string
    remove_column :end_users, :last_name_kana, :string
  end
end
