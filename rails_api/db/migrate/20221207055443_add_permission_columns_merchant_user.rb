class AddPermissionColumnsMerchantUser < ActiveRecord::Migration[7.0]
  def up
    add_column :merchant_users, :allow_read_message_template, :integer, default: false
    add_column :merchant_users, :allow_update_message_template, :integer, default: 0
  end

  def down
    remove_column :merchant_users, :allow_read_message_template, :integer, default: false
    remove_column :merchant_users, :allow_update_message_template, :integer, default: 0
  end
end
