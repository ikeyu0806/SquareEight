class CreateStripePeople < ActiveRecord::Migration[7.0]
  def change
    create_table :stripe_people do |t|
      t.integer :account_id, null: false
      t.string :stripe_person_id, null: false
      t.string :last_name
      t.string :first_name
      t.boolean :is_representative, default: false
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
