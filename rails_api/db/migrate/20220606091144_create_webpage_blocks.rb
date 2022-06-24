class CreateWebpageBlocks < ActiveRecord::Migration[7.0]
  def change
    create_table :webpage_blocks do |t|
      t.integer :webpage_id, null: false
      t.text :content_json, null: false
      t.integer :block_type
      t.timestamps
    end
  end
end
