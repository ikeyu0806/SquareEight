class CreateLineUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :line_users do |t|
      t.string :public_id, null: false
      t.integer :account_id, null: false
      t.string :line_user_id
      t.string :line_display_name
      t.string :line_picture_url
      t.integer :customer_id

      t.timestamps
    end
  end
end
