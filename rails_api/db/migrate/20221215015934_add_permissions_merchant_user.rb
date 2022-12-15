class AddPermissionsMerchantUser < ActiveRecord::Migration[7.0]
  def up
    add_column :merchant_users, :allow_read_line_official_account, :integer, default: 0
    add_column :merchant_users, :allow_update_line_official_account, :integer, default: 0
    add_column :merchant_users, :allow_read_line_user, :integer, default: 0
    add_column :merchant_users, :allow_connect_line_user, :integer, default: 0
    add_column :merchant_users, :allow_send_mail, :integer, default: 0
    add_column :merchant_users, :allow_send_line_message, :integer, default: 0
  end

  def down
    remove_column :merchant_users, :allow_read_line_official_account, :integer, default: 0
    remove_column :merchant_users, :allow_update_line_official_account, :integer, default: 0
    remove_column :merchant_users, :allow_read_line_user, :integer, default: 0
    remove_column :merchant_users, :allow_connect_line_user, :integer, default: 0
    remove_column :merchant_users, :allow_send_mail, :integer, default: 0
    remove_column :merchant_users, :allow_send_line_message, :integer, default: 0
  end
end
