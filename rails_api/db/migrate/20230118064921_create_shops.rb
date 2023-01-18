class CreateShops < ActiveRecord::Migration[7.0]
  def change
    create_table :shops do |t|
      t.integer :account_id, null: false
      t.string :name, null: false
      t.string :description1, null: false
      t.string :description2
      t.string :postal_code
      t.string :state
      t.string :city
      t.string :town
      t.string :line1
      t.string :line2
      t.string :access_info
      t.boolean :is_parking_lot_present, default: false
      t.string :remarks
      t.integer :page_cover_slide1_account_s3_image_id
      t.integer :page_cover_slide2_account_s3_image_id
      t.integer :page_cover_slide3_account_s3_image_id
      t.integer :brand_image_account_s3_image_id
      t.integer :shop_image1_account_s3_image_id
      t.integer :shop_image2_account_s3_image_id
      t.integer :shop_image3_account_s3_image_id
      t.boolean :is_review_reception, default: false
      t.integer :business_type, default: 99

      t.timestamps
    end
  end
end
