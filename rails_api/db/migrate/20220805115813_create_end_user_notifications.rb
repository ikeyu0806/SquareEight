class CreateEndUserNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :end_user_notifications do |t|
      t.string :title
      t.text :content

      t.timestamps
    end
  end
end
