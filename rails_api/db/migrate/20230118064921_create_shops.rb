class CreateShops < ActiveRecord::Migration[7.0]
  def change
    create_table :shops do |t|
      t.string :public_id, null: false
      t.integer :account_id, null: false
      t.string :name, null: false
      t.string :phone_number
      t.string :business_hours_text
      t.string :parking_lot_guidance
      t.string :description1
      t.string :description2
      t.string :description3
      t.string :description4
      t.string :description5
      t.string :description6
      t.string :postal_code
      t.string :state
      t.string :city
      t.string :town
      t.string :line1
      t.string :line2
      t.string :access_info
      t.string :remarks
      t.integer :shop_image1_account_s3_image_id
      t.integer :shop_image2_account_s3_image_id
      t.integer :shop_image3_account_s3_image_id
      t.integer :shop_image4_account_s3_image_id
      t.integer :shop_image5_account_s3_image_id
      t.integer :shop_image6_account_s3_image_id
      t.boolean :is_review_reception, default: false
      t.integer :business_type, default: 99

      t.timestamps
    end
  end
end
