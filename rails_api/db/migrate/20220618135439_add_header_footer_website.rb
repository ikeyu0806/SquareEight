class AddHeaderFooterWebsite < ActiveRecord::Migration[7.0]
  def up
    add_column :websites, :default_footer_content, :text, comment: 'デフォルトヘッダ'
    add_column :websites, :default_header_content, :text, comment: 'デフォルトフッタ'
  end

  def down
    remove_column :websites, :default_header_content, :text
    remove_column :websites, :default_footer_content, :text
  end
end
