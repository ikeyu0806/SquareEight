class CreateStripePeople < ActiveRecord::Migration[7.0]
  def change
    create_table :stripe_people do |t|
      t.integer :account_id, null: false
      t.string :stripe_person_id, null: false

      t.timestamps
    end
  end
end
