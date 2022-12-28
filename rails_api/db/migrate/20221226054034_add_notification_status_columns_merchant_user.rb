class AddNotificationStatusColumnsMerchantUser < ActiveRecord::Migration[7.0]
  def up
    add_column :merchant_users, :read_dashboard, :integer, default: 0
    add_column :merchant_users, :read_questionnaire_answers_status, :integer, default: 0
    add_column :merchant_users, :read_reservations_status, :integer, default: 0
    add_column :merchant_users, :read_orders_status, :integer, default: 0
    add_column :merchant_users, :read_account_notifications_status, :integer, default: 0
    add_column :merchant_users, :read_business_notifications_status, :integer, default: 0
  end

  def down
    remove_column :merchant_users, :read_dashboard, :integer, default: 0
    remove_column :merchant_users, :read_questionnaire_answers_status, :integer, default: 0
    remove_column :merchant_users, :read_reservations_status, :integer, default: 0
    remove_column :merchant_users, :read_orders_status, :integer, default: 0
    remove_column :merchant_users, :read_sales, :integer, default: 0
    remove_column :merchant_users, :read_account_notifications_status, :integer, default: 0
    remove_column :merchant_users, :read_business_notifications_status, :integer, default: 0
  end
end
