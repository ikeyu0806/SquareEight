class CreateMessageTemplates < ActiveRecord::Migration[7.0]
  def change
    create_table :message_templates do |t|
      t.integer :account_id
      t.string :name
      t.text :content

      t.timestamps
    end
  end
end
