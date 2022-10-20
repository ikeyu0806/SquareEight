class CreateAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :accounts do |t|
      t.string :business_name
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
