class CreateSystemEndUserNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :system_end_user_notifications do |t|
      t.string :title
      t.text :content
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
