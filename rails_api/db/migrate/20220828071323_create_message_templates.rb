class CreateMessageTemplates < ActiveRecord::Migration[7.0]
  def change
    create_table :message_templates do |t|
      t.integer :account_id, null: false
      t.string :name, null: false
      t.string :title, null: false
      t.text :content, null: false
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
