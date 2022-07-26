class AddFirstLastNameMerchantUser < ActiveRecord::Migration[7.0]
  def up
    add_column :merchant_users, :first_name, :string
    add_column :merchant_users, :last_name, :string
    remove_column :merchant_users, :name, :string
  end

  def down
    remove_column :merchant_users, :first_name, :string
    remove_column :merchant_users, :last_name, :string
    add_column :merchant_users, :name, :string
  end
end
