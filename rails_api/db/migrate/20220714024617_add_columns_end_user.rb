class AddColumnsEndUser < ActiveRecord::Migration[7.0]
  def up
    add_column :end_users, :first_name, :string
    add_column :end_users, :last_name, :string
    add_column :end_users, :first_name_kana, :string
    add_column :end_users, :last_name_kana, :string
    add_column :end_users, :postal_code, :string
    add_column :end_users, :state, :string
    add_column :end_users, :city, :string
    add_column :end_users, :town, :string
    add_column :end_users, :line1, :string
    add_column :end_users, :line2, :string
    add_column :end_users, :state_kana, :string
    add_column :end_users, :city_kana, :string
    add_column :end_users, :town_kana, :string
    add_column :end_users, :line1_kana, :string
    add_column :end_users, :line2_kana, :string
    add_column :end_users, :gender, :integer
    add_column :end_users, :dob, :datetime
  end

  def down
    remove_column :end_users, :first_name, :string
    remove_column :end_users, :last_name, :string
    remove_column :end_users, :first_name_kana, :string
    remove_column :end_users, :last_name_kana, :string
    remove_column :end_users, :postal_code, :string
    remove_column :end_users, :state, :string
    remove_column :end_users, :city, :string
    remove_column :end_users, :town, :string
    remove_column :end_users, :line1, :string
    remove_column :end_users, :line2, :string
    remove_column :end_users, :state_kana, :string
    remove_column :end_users, :city_kana, :string
    remove_column :end_users, :town_kana, :string
    remove_column :end_users, :line1_kana, :string
    remove_column :end_users, :line2_kana, :string
    remove_column :end_users, :gender, :integer
    remove_column :end_users, :dob, :datetime
  end
end
