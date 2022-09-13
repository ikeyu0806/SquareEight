class AddPublishStatusColumns < ActiveRecord::Migration[7.0]
  def up
    add_column :webpages, :publish_status, :integer, default: 0
    add_column :products, :publish_status, :integer, default: 0
    add_column :ticket_masters, :publish_status, :integer, default: 0
    add_column :monthly_payment_plans, :publish_status, :integer, default: 0
    add_column :questionnaire_masters, :publish_status, :integer, default: 0
  end

  def down
    remove_column :webpages, :publish_status, :integer
    remove_column :products, :publish_status, :integer
    remove_column :ticket_masters, :publish_status, :integer
    remove_column :monthly_payment_plans, :publish_status, :integer
    remove_column :questionnaire_masters, :publish_status, :integer
  end
end
