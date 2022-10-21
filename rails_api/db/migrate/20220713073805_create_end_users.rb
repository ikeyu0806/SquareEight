class CreateEndUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :end_users do |t|
      t.string :email, null: false
      t.string :phone_number
      t.string :password_digest
      t.integer :authority_category, default: 0
      t.boolean :is_introduction_complete
      t.string :verification_code
      t.datetime :verification_code_expired_at
      t.integer :authentication_status
      t.string :public_id, null: false

      t.timestamps
    end
    add_index :end_users, :email, unique: true
  end
end
