class CreateWebpages < ActiveRecord::Migration[7.0]
  def change
    create_table :webpages do |t|
      t.integer :website_id, comment: 'WebサイトID'
      t.string :path, comment: 'サイト内パス'
      t.string :tag, comment: 'タグ'
      t.timestamps
    end
  end
end
