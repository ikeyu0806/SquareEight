class AddGoogleAuthColumnsEndUser < ActiveRecord::Migration[7.0]
  def up
    add_column :end_users, :google_auth_id, :string
    add_column :end_users, :google_auth_email, :string
  end

  def down
    remove_column :end_users, :google_auth_id, :string
    remove_column :end_users, :google_auth_email, :string
  end
end
