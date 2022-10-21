class CreateAccountS3Images < ActiveRecord::Migration[7.0]
  def change
    create_table :account_s3_images do |t|
      t.integer :account_id, null: false
      t.string :s3_object_public_url, null: false
      t.string :s3_object_name, null: false
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
