class AddUrlEndUserNotification < ActiveRecord::Migration[7.0]
  def up
    add_column :end_user_notifications, :url, :string
  end

  def down
    remove_column :end_user_notifications, :url, :string
  end
end
