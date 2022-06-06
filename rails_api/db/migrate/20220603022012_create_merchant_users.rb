class CreateMerchantUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :merchant_users do |t|
      t.integer :account_id, comment: 'アカウントID'
      t.string :email, null: false, comment: 'Email'
      t.string :name, comment: '名前'
      t.string :name_kana, comment: '名前カナ'
      t.string :password_digest, comment: 'ハッシュ化パスワード'
      t.integer :authority_category, default: 0, comment: '権限区分'
      t.boolean :is_introduction_complete, comment: 'イントロダクション終了状況'
      t.string :verification_code, comment: '検証コード'
      t.datetime :verification_code_expired_at, comment: '検証コード期限切れ日時'
      t.integer :authentication_status, comment: '認証ステータスのenum'

      t.timestamps
    end
    add_index :merchant_users, :email, unique: true
  end
end
