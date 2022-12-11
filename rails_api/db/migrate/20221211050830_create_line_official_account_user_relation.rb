class CreateLineOfficialAccountUserRelation < ActiveRecord::Migration[7.0]
  def change
    create_table :line_official_account_user_relations do |t|
      t.string :public_id, null: false
      t.integer :line_official_account_id, null: false
      t.integer :line_user_id, null: false

      t.timestamps
    end
  end
end
