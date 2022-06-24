class AddHeaderFooterWebsite < ActiveRecord::Migration[7.0]
  def up
    add_column :websites, :default_footer_content, :text
    add_column :websites, :default_header_content, :text
  end

  def down
    remove_column :websites, :default_header_content, :text
    remove_column :websites, :default_footer_content, :text
  end
end
