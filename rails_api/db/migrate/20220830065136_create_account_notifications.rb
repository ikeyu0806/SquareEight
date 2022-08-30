class CreateAccountNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :account_notifications do |t|

      t.timestamps
    end
  end
end
