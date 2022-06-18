class CreateWebsiteSharedComponents < ActiveRecord::Migration[7.0]
  def change
    create_table :website_shared_components do |t|
      t.text :header_content_json, comment: 'ヘッダ内容json'
      t.text :footer_content_json, comment: 'フッタ内容json'
      t.timestamps
    end
  end
end
