class ChangeSharedComponentImageColumns < ActiveRecord::Migration[7.0]
  def up
    add_column :shared_components, :navbar_image_account_s3_image_id, :integer
    remove_column :shared_components, :navbar_brand_image_s3_object_public_url, :string
    remove_column :shared_components, :nabvar_brand_image_s3_object_name, :string
  end

  def down
    remove_column :shared_components, :navbar_image_account_s3_image_id, :integer
    add_column :shared_components, :navbar_brand_image_s3_object_public_url, :string
    add_column :shared_components, :nabvar_brand_image_s3_object_name, :string
  end
end
