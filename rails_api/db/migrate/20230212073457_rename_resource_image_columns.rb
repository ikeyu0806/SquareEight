class RenameResourceImageColumns < ActiveRecord::Migration[7.0]
  def up
    rename_column :resources, :resource_image1_account_s3_image_id, :image1_account_s3_image_id
    rename_column :resources, :resource_image2_account_s3_image_id, :image2_account_s3_image_id
    rename_column :resources, :resource_image3_account_s3_image_id, :image3_account_s3_image_id
    rename_column :resources, :resource_image4_account_s3_image_id, :image4_account_s3_image_id
    rename_column :resources, :resource_image5_account_s3_image_id, :image5_account_s3_image_id
  end

  def down
    rename_column :resources, :image1_account_s3_image_id, :resource_image1_account_s3_image_id
    rename_column :resources, :image2_account_s3_image_id, :resource_image2_account_s3_image_id
    rename_column :resources, :image3_account_s3_image_id, :resource_image3_account_s3_image_id
    rename_column :resources, :image4_account_s3_image_id, :resource_image4_account_s3_image_id
    rename_column :resources, :image5_account_s3_image_id, :resource_image5_account_s3_image_id
  end
end
