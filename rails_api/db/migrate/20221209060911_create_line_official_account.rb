class CreateLineOfficialAccount < ActiveRecord::Migration[7.0]
  def change
    create_table :line_official_accounts do |t|
      t.string :public_id, null: false
      t.integer :account_id, null: false
      t.string :name, null: false
      t.string :channel_id
      t.string :channel_secret
      t.string :channel_token
      t.string :login_channel_id
      t.string :login_channel_secret
      t.string :login_channel_token
      t.string :qr_code_url

      t.timestamps
    end
  end
end
