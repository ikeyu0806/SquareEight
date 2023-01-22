class DropProductImageRelation < ActiveRecord::Migration[7.0]
  def up
    drop_table :product_image_relations
  end

  def down
    fail ActiveRecord::IrreversibleMigration
  end
end
