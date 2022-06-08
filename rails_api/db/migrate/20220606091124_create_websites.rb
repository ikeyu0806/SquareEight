class CreateWebsites < ActiveRecord::Migration[7.0]
  def change
    create_table :websites do |t|
      t.integer :account_id, null: false, comment: 'アカウントID'
      t.string :tag, comment: 'タグ'
      t.timestamps
    end
  end
end
