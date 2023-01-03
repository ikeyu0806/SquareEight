# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

account = Account.first_or_create!(
  business_name: "管理ユーザ",
  stripe_customer_id: "cus_LwJxeaXaTnVjba",
  stripe_account_id: "acct_1LFYYj2eLQ63YTOo"
)

SharedComponent.first_or_create!(
  account_id: account.id,
)

MerchantUser.first_or_create!(
  account_id: account.id,
  email: "merchant_user@develop.com",
  password: "Pass1234",
  authority_category: "RootUser",
  email_authentication_status: "Enabled",
  is_root_user: true,
  allow_read_merchant_user: "Allow",
  allow_create_merchant_user: "Allow",
  allow_update_merchant_user: "Allow",
  allow_delete_merchant_user: "Allow",
  allow_update_merchant_user_permission: "Allow",
  allow_read_reserve_frame: "Allow",
  allow_create_reserve_frame: "Allow",
  allow_update_reserve_frame: "Allow",
  allow_delete_reserve_frame: "Allow",
  allow_read_reservation: "Allow",
  allow_create_reservation: "Allow",
  allow_confirm_reservation: "Allow",
  allow_cancel_reservation: "Allow",
  allow_read_ticket_master: "Allow",
  allow_create_ticket_master: "Allow",
  allow_update_ticket_master: "Allow",
  allow_delete_ticket_master: "Allow",
  allow_read_monthly_payment_plan: "Allow",
  allow_create_monthly_payment_plan: "Allow",
  allow_update_monthly_payment_plan: "Allow",
  allow_delete_monthly_payment_plan: "Allow",
  allow_read_resource: "Allow",
  allow_create_resource: "Allow",
  allow_update_resource: "Allow",
  allow_delete_resource: "Allow",
  allow_read_product: "Allow",
  allow_create_product: "Allow",
  allow_update_product: "Allow",
  allow_delete_product: "Allow",
  allow_update_delivery_datetime: "Allow",
  allow_update_product_shipping_status: "Allow",
  allow_read_customer: "Allow",
  allow_create_customer: "Allow",
  allow_update_customer: "Allow",
  allow_delete_customer: "Allow",
  allow_read_customer_group: "Allow",
  allow_create_customer_group: "Allow",
  allow_update_customer_group: "Allow",
  allow_delete_customer_group: "Allow",
  allow_read_message_template: "Allow",
  allow_create_message_template: "Allow",
  allow_update_message_template: "Allow",
  allow_delete_message_template: "Allow",
  allow_read_html_mail_template: "Allow",
  allow_create_html_mail_template: "Allow",
  allow_update_html_mail_template: "Allow",
  allow_delete_html_mail_template: "Allow",
  allow_read_webpage: "Allow",
  allow_create_webpage: "Allow",
  allow_update_webpage: "Allow",
  allow_delete_webpage: "Allow",
  allow_read_questionnaire_master: "Allow",
  allow_create_questionnaire_master: "Allow",
  allow_update_questionnaire_master: "Allow",
  allow_delete_questionnaire_master: "Allow",
  allow_read_questionnaire_answer: "Allow",
  allow_read_sales: "Allow",
  allow_read_payment_request: "Allow",
  allow_create_payment_request: "Allow",
  allow_read_credit_card: "Allow",
  allow_update_credit_card: "Allow",
  allow_read_stripe_business_info: "Allow",
  allow_update_stripe_business_info: "Allow",
  allow_read_system_plan_subscription_payments: "Allow",
  allow_update_shared_component: "Allow",
  allow_update_system_plan: "Allow",
  allow_read_line_official_account: "Allow",
  allow_update_line_official_account: "Allow",
  allow_read_line_user: "Allow",
  allow_connect_line_user: "Allow",
  allow_send_mail: "Allow",
  allow_send_line_message: "Allow"
)

EndUser.first_or_create!(
  first_name: "デモ",
  last_name: "ユーザ",
  email: "end_user@develop.com",
  password: "Pass1234",
  stripe_customer_id: "cus_M9qiqO8wOda3Xo",
  email_authentication_status: "Enabled"
)

SystemAdminUser.first_or_create!(
  name: "admin_user",
  email: "system_admin@develop.com",
  phone_number: "12312341234",
  password: "Pass1234",
  authentication_status: "Enabled"
)

Resource.first_or_create!(
  [
    {
      name: "スタジオ",
      quantity: 3,
    },
    {
      name: "ヨガマット",
      quantity: 3,
    },
    {
      name: "〇〇先生",
      quantity: 1,
    }
  ]
)

ReserveFrame.first_or_create!(
  [
    {
      account_id: account.id,
      title: "予約メニュ-デモ。曜日繰り返し",
      start_at: Time.zone.now,
      description: "デモ用予約メニュ-01\n\nこれはデモ用の予約メニューです。",
      is_repeat: true,
      repeat_interval_type: "WDay",
      repeat_interval_number_day: 1,
      repeat_interval_number_week: 1,
      repeat_interval_number_month: 1,
      repeat_interval_month_date: 1,
      repeat_end_date: Time.zone.now + 10.years,
      capacity: 10,
      local_payment_price: 3000,
      publish_status: "Publish",
      reception_type: "Immediate",
      reception_start_day_before: 180,
      reception_deadline: "OnlyOnTheDay",
      reception_deadline_hour_before: 1,
      reception_deadline_day_before: 1,
      is_local_payment_enable: true,
      is_ticket_payment_enable: false,
      is_monthly_plan_payment_enable: false,
      credit_card_payment_price: 2800,
      is_credit_card_payment_enable: false,
      is_every_day_repeat: true,
      is_every_week_repeat: true,
      is_every_month_repeat: true,
      reception_phone_number: "",
      is_set_price: true,
      is_repeat_sun: false,
      is_repeat_mon: true,
      is_repeat_tue: false,
      is_repeat_wed: true,
      is_repeat_thu: false,
      is_repeat_fri: true,
      is_repeat_sat: false,
      deleted_at: nil,
      questionnaire_master_id: nil,
      is_accept_cancel: true,
      is_accept_cancel_on_the_day: false,
      cancel_reception_day_before: 1,
      cancel_reception_hour_before: 1,
      lottery_confirmed_day_before: 1
    }
  ]
)
