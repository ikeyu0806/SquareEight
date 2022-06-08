class CreateWebpageImages < ActiveRecord::Migration[7.0]
  def change
    create_table :webpage_images do |t|
      t.integer :webpage_block_id, comment: 'WebページブロックID'
      t.string :s3_url, null: false, comment: 'S3バケットURL'
      t.integer :display_order, comment: '表示順'
      t.timestamps
    end
  end
end
