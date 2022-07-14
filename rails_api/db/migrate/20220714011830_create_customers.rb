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
      t.string :postal_code
      t.string :state
      t.string :city
      t.string :town
      t.string :line1
      t.string :line2
      t.string :state_kana
      t.string :city_kana
      t.string :town_kana
      t.string :line1_kana
      t.string :line2_kana
      t.integer :gender
      t.datetime :dob
      t.text :custom_items_answer

      t.timestamps
    end
  end
end
