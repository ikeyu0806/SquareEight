require 'securerandom'

class MerchantUser < ApplicationRecord
  include PublicIdModule

  has_secure_password(validations: false)

  belongs_to :account
  has_many :reservations, through: :account
  has_many :customers, through: :account

  enum email_authentication_status: { Disabled: 0, Enabled: 1 }
  enum authority_category: { RootUser: 0, AdminUser: 1, CommonUser: 2 }

  enum allow_read_merchant_user: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_create_merchant_user: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_update_merchant_user: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_delete_merchant_user: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_update_merchant_user_permission: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_read_reserve_frame: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_create_reserve_frame: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_update_reserve_frame: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_delete_reserve_frame: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_read_reservation: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_create_reservation: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_confirm_reservation: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_cancel_reservation: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_read_ticket_master: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_create_ticket_master: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_update_ticket_master: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_delete_ticket_master: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_read_monthly_payment_plan: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_create_monthly_payment_plan: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_update_monthly_payment_plan: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_delete_monthly_payment_plan: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_read_resource: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_create_resource: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_update_resource: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_delete_resource: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_read_product: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_create_product: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_update_product: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_delete_product: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_update_delivery_datetime: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_update_product_shipping_status: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_read_customer: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_create_customer: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_update_customer: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_delete_customer: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_read_customer_group: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_create_customer_group: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_update_customer_group: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_delete_customer_group: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_read_message_template: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_update_message_template: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_read_webpage: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_create_webpage: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_update_webpage: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_delete_webpage: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_read_questionnaire_master: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_create_questionnaire_master: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_update_questionnaire_master: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_delete_questionnaire_master: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_read_questionnaire_answer: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_read_sales: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_read_payment_request: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_create_payment_request: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_read_credit_card: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_update_credit_card: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_read_stripe_business_info: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_update_stripe_business_info: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_read_system_plan_subscription_payments: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_update_shared_component: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_update_system_plan: { Forbid: 0, Allow: 1 }, _prefix: true

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
    self.allow_read_merchant_user = 'Allow'
    self.allow_create_merchant_user = 'Forbid'
    self.allow_update_merchant_user = 'Forbid'
    self.allow_delete_merchant_user = 'Forbid'
    self.allow_update_merchant_user_permission = 'Forbid'
    self.allow_read_reserve_frame = 'Allow'
    self.allow_create_reserve_frame = 'Allow'
    self.allow_update_reserve_frame = 'Allow'
    self.allow_delete_reserve_frame = 'Allow'
    self.allow_read_reservation = 'Allow'
    self.allow_create_reservation = 'Allow'
    self.allow_confirm_reservation = 'Allow'
    self.allow_cancel_reservation = 'Allow'
    self.allow_read_ticket_master = 'Allow'
    self.allow_create_ticket_master = 'Allow'
    self.allow_update_ticket_master = 'Allow'
    self.allow_delete_ticket_master = 'Allow'
    self.allow_read_monthly_payment_plan = 'Allow'
    self.allow_create_monthly_payment_plan = 'Allow'
    self.allow_update_monthly_payment_plan = 'Allow'
    self.allow_delete_monthly_payment_plan = 'Allow'
    self.allow_read_resource = 'Allow'
    self.allow_create_resource = 'Allow'
    self.allow_update_resource = 'Allow'
    self.allow_delete_resource = 'Allow'
    self.allow_read_product = 'Allow'
    self.allow_create_product = 'Allow'
    self.allow_update_product = 'Allow'
    self.allow_delete_product = 'Allow'
    self.allow_update_delivery_datetime = 'Allow'
    self.allow_update_product_shipping_status = 'Allow'
    self.allow_read_customer = 'Allow'
    self.allow_create_customer = 'Allow'
    self.allow_update_customer = 'Allow'
    self.allow_delete_customer = 'Allow'
    self.allow_read_customer_group = 'Allow'
    self.allow_create_customer_group = 'Allow'
    self.allow_update_customer_group = 'Allow'
    self.allow_delete_customer_group = 'Allow'
    self.allow_read_message_template = 'Allow'
    self.allow_update_message_template = 'Allow'
    self.allow_read_webpage = 'Allow'
    self.allow_create_webpage = 'Allow'
    self.allow_update_webpage = 'Allow'
    self.allow_delete_webpage = 'Allow'
    self.allow_read_questionnaire_master = 'Allow'
    self.allow_create_questionnaire_master = 'Allow'
    self.allow_update_questionnaire_master = 'Allow'
    self.allow_delete_questionnaire_master = 'Allow'
    self.allow_read_questionnaire_answer = 'Allow'
    self.allow_read_sales = 'Allow'
    self.allow_read_payment_request = 'Allow'
    self.allow_create_payment_request = 'Allow'
    self.allow_read_credit_card = 'Allow'
    self.allow_update_credit_card = 'Allow'
    self.allow_read_stripe_business_info = 'Allow'
    self.allow_update_stripe_business_info  = 'Allow'
    self.allow_read_system_plan_subscription_payments  = 'Allow'
    self.allow_update_shared_component  = 'Allow'
    self.allow_update_system_plan  = 'Forbid'
  end

  def set_common_user_default_permission
    self.allow_read_merchant_user = 'Allow'
    self.allow_create_merchant_user = 'Forbid'
    self.allow_update_merchant_user = 'Forbid'
    self.allow_delete_merchant_user = 'Forbid'
    self.allow_update_merchant_user_permission = 'Forbid'
    self.allow_read_reserve_frame = 'Allow'
    self.allow_create_reserve_frame = 'Forbid'
    self.allow_update_reserve_frame = 'Forbid'
    self.allow_delete_reserve_frame = 'Forbid'
    self.allow_read_reservation = 'Allow'
    self.allow_create_reservation = 'Forbid'
    self.allow_confirm_reservation = 'Forbid'
    self.allow_cancel_reservation = 'Forbid'
    self.allow_read_ticket_master = 'Allow'
    self.allow_create_ticket_master = 'Forbid'
    self.allow_update_ticket_master = 'Forbid'
    self.allow_delete_ticket_master = 'Forbid'
    self.allow_read_monthly_payment_plan = 'Allow'
    self.allow_create_monthly_payment_plan = 'Forbid'
    self.allow_update_monthly_payment_plan = 'Forbid'
    self.allow_delete_monthly_payment_plan = 'Forbid'
    self.allow_read_resource = 'Allow'
    self.allow_create_resource = 'Forbid'
    self.allow_update_resource = 'Forbid'
    self.allow_delete_resource = 'Forbid'
    self.allow_read_product = 'Allow'
    self.allow_create_product = 'Forbid'
    self.allow_update_product = 'Forbid'
    self.allow_delete_product = 'Forbid'
    self.allow_update_delivery_datetime = 'Forbid'
    self.allow_update_product_shipping_status = 'Allow'
    self.allow_read_customer = 'Allow'
    self.allow_create_customer = 'Forbid'
    self.allow_update_customer = 'Forbid'
    self.allow_delete_customer = 'Forbid'
    self.allow_read_customer_group = 'Allow'
    self.allow_create_customer_group = 'Forbid'
    self.allow_update_customer_group = 'Forbid'
    self.allow_delete_customer_group = 'Forbid'
    self.allow_read_message_template = 'Allow'
    self.allow_update_message_template = 'Forbid'
    self.allow_read_webpage = 'Allow'
    self.allow_create_webpage = 'Forbid'
    self.allow_update_webpage = 'Forbid'
    self.allow_delete_webpage = 'Forbid'
    self.allow_read_questionnaire_master = 'Allow'
    self.allow_create_questionnaire_master = 'Forbid'
    self.allow_update_questionnaire_master = 'Forbid'
    self.allow_delete_questionnaire_master = 'Forbid'
    self.allow_read_questionnaire_answer = 'Allow'
    self.allow_read_sales = 'Allow'
    self.allow_read_payment_request = 'Allow'
    self.allow_create_payment_request = 'Forbid'
    self.allow_read_credit_card = 'Allow'
    self.allow_update_credit_card = 'Forbid'
    self.allow_read_stripe_business_info = 'Forbid'
    self.allow_update_stripe_business_info  = 'Forbid'
    self.allow_read_system_plan_subscription_payments  = 'Forbid'
    self.allow_update_shared_component  = 'Forbid'
    self.allow_update_system_plan  = 'Forbid'
  end
end
