class CreateHtmlMailTemplates < ActiveRecord::Migration[7.0]
  def change
    create_table :html_mail_templates do |t|
      t.integer :account_id, null: false
      t.string :name, null: false
      t.string :mail_title, null: false
      t.text :content, null: false
      t.integer :template_type, null: false, default: 0
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
