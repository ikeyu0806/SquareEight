class AddMerchantUserPermissionColumns < ActiveRecord::Migration[7.0]
  def up
    add_column :merchant_users, :allow_read_merchant_user, :boolean, default: false
    add_column :merchant_users, :allow_create_merchant_user, :boolean, default: false
    add_column :merchant_users, :allow_update_merchant_user, :boolean, default: false
    add_column :merchant_users, :allow_delete_merchant_user, :boolean, default: false
    add_column :merchant_users, :allow_read_reserve_frame, :boolean, default: false
    add_column :merchant_users, :allow_create_reserve_frame, :boolean, default: false
    add_column :merchant_users, :allow_update_reserve_frame, :boolean, default: false
    add_column :merchant_users, :allow_delete_reserve_frame, :boolean, default: false
    add_column :merchant_users, :allow_read_reservation, :boolean, default: false
    add_column :merchant_users, :allow_create_reservation, :boolean, default: false
    add_column :merchant_users, :allow_update_reservation, :boolean, default: false
    add_column :merchant_users, :allow_delete_reservation, :boolean, default: false
    add_column :merchant_users, :allow_read_ticket_master, :boolean, default: false
    add_column :merchant_users, :allow_create_ticket_master, :boolean, default: false
    add_column :merchant_users, :allow_update_ticket_master, :boolean, default: false
    add_column :merchant_users, :allow_delete_ticket_master, :boolean, default: false
    add_column :merchant_users, :allow_read_monthly_payment_plan, :boolean, default: false
    add_column :merchant_users, :allow_create_monthly_payment_plan, :boolean, default: false
    add_column :merchant_users, :allow_update_monthly_payment_plan, :boolean, default: false
    add_column :merchant_users, :allow_delete_monthly_payment_plan, :boolean, default: false
    add_column :merchant_users, :allow_read_resource, :boolean, default: false
    add_column :merchant_users, :allow_create_resource, :boolean, default: false
    add_column :merchant_users, :allow_update_resource, :boolean, default: false
    add_column :merchant_users, :allow_delete_resource, :boolean, default: false
    add_column :merchant_users, :allow_read_product, :boolean, default: false
    add_column :merchant_users, :allow_create_product, :boolean, default: false
    add_column :merchant_users, :allow_update_product, :boolean, default: false
    add_column :merchant_users, :allow_delete_product, :boolean, default: false
    add_column :merchant_users, :allow_update_delivery_setting, :boolean, default: false
    add_column :merchant_users, :allow_update_product_shipping_status, :boolean, default: false
    add_column :merchant_users, :allow_read_customer, :boolean, default: false
    add_column :merchant_users, :allow_create_customer, :boolean, default: false
    add_column :merchant_users, :allow_update_customer, :boolean, default: false
    add_column :merchant_users, :allow_delete_customer, :boolean, default: false
    add_column :merchant_users, :allow_read_customer_group, :boolean, default: false
    add_column :merchant_users, :allow_create_customer_group, :boolean, default: false
    add_column :merchant_users, :allow_update_customer_group, :boolean, default: false
    add_column :merchant_users, :allow_delete_customer_group, :boolean, default: false
    add_column :merchant_users, :allow_read_webpage, :boolean, default: false
    add_column :merchant_users, :allow_create_webpage, :boolean, default: false
    add_column :merchant_users, :allow_update_webpage, :boolean, default: false
    add_column :merchant_users, :allow_delete_webpage, :boolean, default: false
    add_column :merchant_users, :allow_read_questionnaire_master, :boolean, default: false
    add_column :merchant_users, :allow_create_questionnaire_master, :boolean, default: false
    add_column :merchant_users, :allow_update_questionnaire_master, :boolean, default: false
    add_column :merchant_users, :allow_delete_questionnaire_master, :boolean, default: false
    add_column :merchant_users, :allow_read_questionnaire_answer, :boolean, default: false
    add_column :merchant_users, :allow_read_sales, :boolean, default: false
    add_column :merchant_users, :allow_read_payment_request, :boolean, default: false
    add_column :merchant_users, :allow_create_payment_request, :boolean, default: false
    add_column :merchant_users, :allow_read_credit_card, :boolean, default: false
    add_column :merchant_users, :allow_update_credit_card, :boolean, default: false
    add_column :merchant_users, :allow_read_stripe_business_info, :boolean, default: false
    add_column :merchant_users, :allow_update_stripe_business_info, :boolean, default: false
  end

  def down
    remove_column :merchant_users, :mcc, :boolean
  end
end
