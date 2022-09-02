class AddUrlAccountNotification < ActiveRecord::Migration[7.0]
  def up
    add_column :account_notifications, :url, :string
  end

  def down
    remove_column :account_notifications, :url, :string
  end
end
