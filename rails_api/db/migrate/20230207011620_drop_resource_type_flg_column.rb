class DropResourceTypeFlgColumn < ActiveRecord::Migration[7.0]
  def up
    remove_column :resources, :resouce_type, :integer
    remove_column :resources, :is_show_frontend, :integer
    remove_column :resources, :image1_account_s3_image_id, :integer
  end

  def down
    add_column :resources, :resouce_type, :integer
    add_column :resources, :is_show_frontend, :integer
    add_column :resources, :image1_account_s3_image_id, :integer
  end
end
