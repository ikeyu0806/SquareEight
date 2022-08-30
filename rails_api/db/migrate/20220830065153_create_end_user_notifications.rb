class CreateEndUserNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :end_user_notifications do |t|

      t.timestamps
    end
  end
end
