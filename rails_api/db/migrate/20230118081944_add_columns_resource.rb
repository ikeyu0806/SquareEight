class AddColumnsResource < ActiveRecord::Migration[7.0]
  def up
    add_column :resources, :resouce_type, :integer
    add_column :resources, :account_s3_image_id, :integer
    add_column :resources, :is_show_frontend, :integer
    add_column :resources, :description, :integer
  end

  def down
    remove_column :resources, :resouce_type, :integer
    remove_column :resources, :account_s3_image_id, :integer
    remove_column :resources, :is_show_frontend, :integer
    remove_column :resources, :description, :integer
  end
end
