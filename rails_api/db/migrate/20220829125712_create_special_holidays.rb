class CreateSpecialHolidays < ActiveRecord::Migration[7.0]
  def change
    create_table :special_holidays do |t|
      t.integer :account_id
      t.datetime :start_at
      t.datetime :end_at
      t.string :manage_id

      t.timestamps
    end
  end
end
