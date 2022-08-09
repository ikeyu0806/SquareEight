class AddAddressColumnsOrder < ActiveRecord::Migration[7.0]
  def up
    add_column :orders, :name, :string
    add_column :orders, :address, :string
    add_column :orders, :postal_code, :string
    add_column :orders, :mailed, :boolean
  end

  def down
    remove_column :orders, :name, :string
    remove_column :orders, :address, :string
    remove_column :orders, :postal_code, :string
    remove_column :orders, :mailed, :boolean
  end
end
