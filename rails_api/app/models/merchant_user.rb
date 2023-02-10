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
  enum allow_read_shop: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_create_shop: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_update_shop: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_delete_shop: { Forbid: 0, Allow: 1 }, _prefix: true
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
  enum allow_create_message_template: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_update_message_template: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_delete_message_template: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_read_html_mail_template: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_create_html_mail_template: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_update_html_mail_template: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_delete_html_mail_template: { Forbid: 0, Allow: 1 }, _prefix: true
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
  enum allow_read_line_official_account: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_update_line_official_account: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_read_line_user: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_connect_line_user: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_send_mail: { Forbid: 0, Allow: 1 }, _prefix: true
  enum allow_send_line_message: { Forbid: 0, Allow: 1 }, _prefix: true

  enum read_dashboard: { AlreadyRead: 0, UnreadExist: 1 }, _prefix: true
  enum read_questionnaire_answers_status: { AlreadyRead: 0, UnreadExist: 1 }, _prefix: true
  enum read_reservations_status: { AlreadyRead: 0, UnreadExist: 1 }, _prefix: true
  enum read_orders_status: { AlreadyRead: 0, UnreadExist: 1 }, _prefix: true
  enum read_account_notifications_status: { AlreadyRead: 0, UnreadExist: 1 }, _prefix: true
  enum read_business_notifications_status: { AlreadyRead: 0, UnreadExist: 1 }, _prefix: true

  validates :authority_category, presence: true
  validates :password, password: true

  def stripe_account_enable
    return false if account.stripe_account_id.blank?
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
    stripe_account = Stripe::Account.retrieve(account.stripe_account_id)
    return JSON.parse(stripe_account.to_json)["requirements"]["currently_due"].blank?
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
    false
  end

  def is_root_user
    return true if authority_category == 'RootUser'
    false
  end

  def set_admin_user_default_permission
    self.allow_read_merchant_user = 'Allow'
    self.allow_create_merchant_user = 'Forbid'
    self.allow_update_merchant_user = 'Forbid'
    self.allow_delete_merchant_user = 'Forbid'
    self.allow_update_merchant_user_permission = 'Forbid'
    self.allow_read_shop = 'Allow'
    self.allow_create_shop = 'Allow'
    self.allow_update_shop = 'Allow'
    self.allow_delete_shop = 'Allow'
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
    self.allow_create_message_template = 'Allow'
    self.allow_update_message_template = 'Allow'
    self.allow_delete_message_template = 'Allow'
    self.allow_read_html_mail_template = 'Allow'
    self.allow_create_html_mail_template = 'Allow'
    self.allow_update_html_mail_template = 'Allow'
    self.allow_delete_html_mail_template = 'Allow'
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
    self.allow_read_line_official_account  = 'Allow'
    self.allow_read_line_user = 'Allow'
    self.allow_update_line_official_account  = 'Allow'
    self.allow_connect_line_user  = 'Allow'
    self.allow_send_mail  = 'Allow'
    self.allow_send_line_message  = 'Allow'
  end

  def set_common_user_default_permission
    self.allow_read_merchant_user = 'Allow'
    self.allow_create_merchant_user = 'Forbid'
    self.allow_update_merchant_user = 'Forbid'
    self.allow_delete_merchant_user = 'Forbid'
    self.allow_update_merchant_user_permission = 'Forbid'
    self.allow_read_shop = 'Allow'
    self.allow_create_shop = 'Forbid'
    self.allow_update_shop = 'Forbid'
    self.allow_delete_shop = 'Forbid'
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
    self.allow_create_message_template = 'Forbid'
    self.allow_update_message_template = 'Forbid'
    self.allow_delete_message_template = 'Forbid'
    self.allow_read_html_mail_template = 'Allow'
    self.allow_create_html_mail_template = 'Forbid'
    self.allow_update_html_mail_template = 'Forbid'
    self.allow_delete_html_mail_template = 'Forbid'
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
    self.allow_read_line_official_account  = 'Allow'
    self.allow_read_line_user = 'Allow'
    self.allow_update_line_official_account  = 'Forbid'
    self.allow_connect_line_user  = 'Allow'
    self.allow_send_mail  = 'Allow'
    self.allow_send_line_message  = 'Allow'
  end

  def today_reservations_count
    reservations
    .where.not(status: ['inputTimeWithPaymentMethod'])
    .where(start_at: Time.zone.now.beginning_of_day..Time.zone.now.end_of_day).count
  end

  def is_shops_exist
    self.account.shops.present?
  end

  def service_plan_status
    return 'Trial' if (Time.zone.now < self.account.trial_end_datetime)
    return self.account.service_plan
  end

  def trial_end_datetime_text
    self.account.trial_end_datetime.strftime("%Y/%m/%d")
  end
end
