class AddIsTopPageWebPage < ActiveRecord::Migration[7.0]
  def up
    add_column :webpages, :is_top_page, :boolean, default: false
  end

  def down
    remove_column :webpages, :is_top_page, :boolean
  end
end
