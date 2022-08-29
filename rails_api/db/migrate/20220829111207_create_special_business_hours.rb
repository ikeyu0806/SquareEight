class CreateSpecialBusinessHours < ActiveRecord::Migration[7.0]
  def change
    create_table :special_business_hours do |t|
      t.integer :account
      t.string :datetime
      t.string :manage_id

      t.timestamps
    end
  end
end
