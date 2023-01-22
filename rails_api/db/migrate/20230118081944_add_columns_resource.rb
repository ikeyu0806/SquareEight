class AddColumnsResource < ActiveRecord::Migration[7.0]
  def up
    add_column :resources, :resouce_type, :integer, default: 99
    add_column :resources, :account_s3_image_id, :integer
    add_column :resources, :is_show_frontend, :integer, default: false
    add_column :resources, :description, :string
  end

  def down
    remove_column :resources, :resouce_type, :integer, default: 99
    remove_column :resources, :account_s3_image_id, :integer
    remove_column :resources, :is_show_frontend, :integer, default: false
    remove_column :resources, :description, :string
  end
end
