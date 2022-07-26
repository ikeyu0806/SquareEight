class RenameAuthenticationStatusEmailAuthenticationStatus < ActiveRecord::Migration[7.0]
  def up
    rename_column :end_users, :authentication_status, :email_authentication_status
    rename_column :merchant_users, :authentication_status, :email_authentication_status
  end

  def down
    rename_column :end_users, :email_authentication_status, :authentication_status
    rename_column :merchant_users, :email_authentication_status, :authentication_status
  end
end
