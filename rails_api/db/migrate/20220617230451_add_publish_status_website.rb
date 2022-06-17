class AddPublishStatusWebsite < ActiveRecord::Migration[7.0]
  def up
    add_column :websites, :publish_status, :integer, default: 0, comment: '公開ステータス'
  end

  def down
    remove_column :websites, :publish_status, :integer
  end
end
