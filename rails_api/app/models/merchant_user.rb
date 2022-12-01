require 'securerandom'

class MerchantUser < ApplicationRecord
  include PublicIdModule

  has_secure_password(validations: false)

  belongs_to :account
  has_many :reservations, through: :account
  has_many :customers, through: :account

  enum email_authentication_status: { Disabled: 0, Enabled: 1 }
  enum authority_category: { RootUser: 0, AdminUser: 1, CommonUser: 2 }

  validates :authority_category, presence: true
  validates :password, password: true

  def stripe_account_enable
    account.stripe_account_id.present?
  end

  def set_email_reset_key
    email_reset_key = SecureRandom.hex(10)
    self.update!(email_reset_key: email_reset_key)
  end

  def stripe_customer_enable
    account.stripe_customer_id.present?
  end

  def is_enabled_email_login
    return true if email.present? && password_digest.present?
    return false
  end

  def set_admin_user_default_permission
    self.allow_read_merchant_user = true
    self.allow_create_merchant_user = true
    self.allow_update_merchant_user = false
    self.allow_delete_merchant_user = true
    self.allow_read_reserve_frame = true
    self.allow_create_reserve_frame = true
    self.allow_update_reserve_frame = true
    self.allow_delete_reserve_frame = true
    self.allow_read_reservation = true
    self.allow_create_reservation = true
    self.allow_update_reservation = true
    self.allow_delete_reservation = true
    self.allow_read_ticket_master = true
    self.allow_create_ticket_master = true
    self.allow_update_ticket_master = true
    self.allow_delete_ticket_master = true
    self.allow_read_monthly_payment_plan = true
    self.allow_create_monthly_payment_plan = true
    self.allow_update_monthly_payment_plan = true
    self.allow_delete_monthly_payment_plan = true
    self.allow_read_resource = true
    self.allow_create_resource = true
    self.allow_update_resource = true
    self.allow_delete_resource = true
    self.allow_read_product = true
    self.allow_create_product = true
    self.allow_update_product = true
    self.allow_delete_product = true
    self.allow_update_delivery_setting = true
    self.allow_update_product_shipping_status = true
    self.allow_read_customer = true
    self.allow_create_customer = true
    self.allow_update_customer = true
    self.allow_delete_customer = true
    self.allow_read_customer_group = true
    self.allow_create_customer_group = true
    self.allow_update_customer_group = true
    self.allow_delete_customer_group = true
    self.allow_read_webpage = true
    self.allow_create_webpage = true
    self.allow_update_webpage = true
    self.allow_delete_webpage = true
    self.allow_read_questionnaire_master = true
    self.allow_create_questionnaire_master = true
    self.allow_update_questionnaire_master = true
    self.allow_delete_questionnaire_master = true
    self.allow_read_questionnaire_answer = true
    self.allow_read_sales = true
    self.allow_read_payment_request = true
    self.allow_create_payment_request = true
    self.allow_read_credit_card = true
    self.allow_update_credit_card = true
    self.allow_read_stripe_business_info = true
    self.allow_update_stripe_business_info  = true
  end

  def set_common_user_default_permission
    self.allow_read_merchant_user = true
    self.allow_create_merchant_user = false
    self.allow_update_merchant_user = false
    self.allow_delete_merchant_user = false
    self.allow_read_reserve_frame = true
    self.allow_create_reserve_frame = 
    self.allow_update_reserve_frame = false
    self.allow_delete_reserve_frame = false
    self.allow_read_reservation = true
    self.allow_create_reservation = false
    self.allow_update_reservation = false
    self.allow_delete_reservation = false
    self.allow_read_ticket_master = true
    self.allow_create_ticket_master = false
    self.allow_update_ticket_master = false
    self.allow_delete_ticket_master = false
    self.allow_read_monthly_payment_plan = true
    self.allow_create_monthly_payment_plan = false
    self.allow_update_monthly_payment_plan = false
    self.allow_delete_monthly_payment_plan = false
    self.allow_read_resource = true
    self.allow_create_resource = false
    self.allow_update_resource = false
    self.allow_delete_resource = false
    self.allow_read_product = true
    self.allow_create_product = false
    self.allow_update_product = false
    self.allow_delete_product = false
    self.allow_update_delivery_setting = false
    self.allow_update_product_shipping_status = true
    self.allow_read_customer = true
    self.allow_create_customer = false
    self.allow_update_customer = false
    self.allow_delete_customer = false
    self.allow_read_customer_group = true
    self.allow_create_customer_group = false
    self.allow_update_customer_group = false
    self.allow_delete_customer_group = false
    self.allow_read_webpage = true
    self.allow_create_webpage = false
    self.allow_update_webpage = false
    self.allow_delete_webpage = false
    self.allow_read_questionnaire_master = true
    self.allow_create_questionnaire_master = false
    self.allow_update_questionnaire_master = false
    self.allow_delete_questionnaire_master = false
    self.allow_read_questionnaire_answer = true
    self.allow_read_sales = true
    self.allow_read_payment_request = true
    self.allow_create_payment_request = false
    self.allow_read_credit_card = true
    self.allow_update_credit_card = false
    self.allow_read_stripe_business_info = false
    self.allow_update_stripe_business_info  = false
  end
end
