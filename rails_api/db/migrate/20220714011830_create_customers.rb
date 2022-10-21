class CreateCustomers < ActiveRecord::Migration[7.0]
  def change
    create_table :customers do |t|
      t.integer :end_user_id
      t.string :first_name
      t.string :last_name
      t.string :first_name_kana
      t.string :last_name_kana
      t.string :email
      t.string :phone_number
      t.integer :gender
      t.datetime :dob
      t.text :custom_items_answer
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
