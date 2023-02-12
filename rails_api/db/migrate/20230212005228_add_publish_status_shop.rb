class AddPublishStatusShop < ActiveRecord::Migration[7.0]
  def up
    add_column :shops, :publish_status, :integer, default: 0
  end

  def down
    add_column :shops, :publish_status, :integer, default: 0
  end
end
