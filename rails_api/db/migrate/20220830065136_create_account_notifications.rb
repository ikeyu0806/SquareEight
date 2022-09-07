class CreateAccountNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :account_notifications do |t|
      t.integer :account_id
      t.string :title

      t.timestamps
    end
  end
end
