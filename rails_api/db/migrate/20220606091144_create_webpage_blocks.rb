class CreateWebpageBlocks < ActiveRecord::Migration[7.0]
  def change
    create_table :webpage_blocks do |t|
      t.integer :webpage_id, comment: 'WebページID'
      t.text :content_json, comment: 'json'
      t.integer :block_type, comment: 'ブロックタイプ'
      t.timestamps
    end
  end
end
