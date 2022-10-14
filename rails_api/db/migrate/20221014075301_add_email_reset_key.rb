class AddEmailResetKey < ActiveRecord::Migration[7.0]
  def up
    add_column :end_users, :email_reset_key, :string
    add_column :merchant_users, :email_reset_key, :string
  end

  def down
    remove_column :end_users, :email_reset_key, :string
    remove_column :merchant_users, :email_reset_key, :string
  end
end
