class AddImageDescriptionResource < ActiveRecord::Migration[7.0]
  def up
    add_column :resources, :resource_image1_account_s3_image_id, :integer
    add_column :resources, :resource_type, :integer, default: 0
    add_column :resources, :is_show_reserve_page, :boolean
  end

  def down
    remove_column :resources, :resource_image1_account_s3_image_id, :integer
    remove_column :resources, :resource_type, :integer, default: 0
    remove_column :resources, :is_show_reserve_page, :boolean
  end
end
