class CreateWebpages < ActiveRecord::Migration[7.0]
  def change
    create_table :webpages do |t|
      t.integer :account_id, null: false
      t.string :tag, null: false
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
