class CreateSharedComponents < ActiveRecord::Migration[7.0]
  def change
    create_table :shared_components do |t|
      t.integer :account_id
      t.string :navbar_brand_text, default: 'SquareEight'
      t.string :navbar_brand_type
      t.string :navbar_brand_image_s3_object_public_url
      t.string :nabvar_brand_image_s3_object_name
      t.string :nabvar_brand_image_height
      t.string :navbar_brand_background_color
      t.string :navbar_brand_variant_color
      t.string :footer_copyright_text, default: 'SquareEight'

      t.timestamps
    end
  end
end
