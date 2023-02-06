class AddShopPermissionMerchantUser < ActiveRecord::Migration[7.0]
  def up
    add_column :merchant_users, :allow_read_shop, :integer, default: 0
    add_column :merchant_users, :allow_create_shop, :integer, default: 0
    add_column :merchant_users, :allow_update_shop, :integer, default: 0
    add_column :merchant_users, :allow_delete_shop, :integer, default: 0
  end

  def down
    remove_column :merchant_users, :allow_read_shop, :integer, default: 0
    remove_column :merchant_users, :allow_create_shop, :integer, default: 0
    remove_column :merchant_users, :allow_update_shop, :integer, default: 0
    remove_column :merchant_users, :allow_delete_shop, :integer, default: 0
  end
end
