class AddHtmlMailTemplatePermission < ActiveRecord::Migration[7.0]
  def up
    add_column :merchant_users, :allow_read_html_mail_template, :integer, default: 0
    add_column :merchant_users, :allow_create_html_mail_template, :integer, default: 0
    add_column :merchant_users, :allow_update_html_mail_template, :integer, default: 0
    add_column :merchant_users, :allow_delete_html_mail_template, :integer, default: 0
  end

  def down
    remove_column :merchant_users, :allow_read_html_mail_template, :integer, default: 0
    remove_column :merchant_users, :allow_create_html_mail_template, :integer, default: 0
    remove_column :merchant_users, :allow_update_html_mail_template, :integer, default: 0
    remove_column :merchant_users, :allow_delete_html_mail_template, :integer, default: 0
  end
end
