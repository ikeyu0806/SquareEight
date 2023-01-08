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

customers = Customer.first_or_create!(
  [
    {
      account_id: account.id,
      first_name: "一郎",
      last_name: "デモ",
      email: "demo1@example.com",
      phone_number: "",
    },
    {
      account_id: account.id,
      first_name: "二郎",
      last_name: "デモ",
      email: "demo2@example.com",
      phone_number: "",
    },
    {
      account_id: account.id,
      first_name: "三郎",
      last_name: "デモ",
      email: "demo3@example.com",
      phone_number: "",
    }
  ]
)

customer_group = CustomerGroup.first_or_create!(
  account_id: account.id,
  name: "デモグループ",
)

CustomerGroupRelation.first_or_create!(
  [
    {
      customer_id: customers[0].id,
      customer_group_id: customer_group.id,
    },
    {
      customer_id: customers[1].id,
      customer_group_id: customer_group.id,
    },
    {
      customer_id: customers[2].id,
      customer_group_id: customer_group.id,
    },
  ]
)

resources = Resource.first_or_create!(
  [
    {
      account_id: account.id,
      name: "スタジオ",
      quantity: 3,
    },
    {
      account_id: account.id,
      name: "ヨガマット",
      quantity: 3,
    },
    {
      account_id: account.id,
      name: "〇〇先生",
      quantity: 1,
    }
  ]
)

reserve_frames = ReserveFrame.first_or_create!(
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
      is_ticket_payment_enable: true,
      is_monthly_plan_payment_enable: true,
      credit_card_payment_price: 3000,
      is_credit_card_payment_enable: true,
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
    },
    {
      account_id: account.id,
      title: "予約メニュ-デモ。毎日繰り返し",
      start_at: Time.zone.now,
      description: "デモ用予約メニュ-01\n\nこれはデモ用の予約メニューです。",
      is_repeat: true,
      repeat_interval_type: "Day",
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
      is_ticket_payment_enable: true,
      is_monthly_plan_payment_enable: true,
      credit_card_payment_price: 3000,
      is_credit_card_payment_enable: true,
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

ReserveFrameReceptionTime.first_or_create!(
  [
    {
      reserve_frame_id: reserve_frames[0].id,
      reception_start_time: DateTime.new(2000, 01, 01, 10, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 11, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[0].id,
      reception_start_time: DateTime.new(2000, 01, 01, 11, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 12, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[0].id,
      reception_start_time: DateTime.new(2000, 01, 01, 13, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 14, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[0].id,
      reception_start_time: DateTime.new(2000, 01, 01, 14, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 15, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[0].id,
      reception_start_time: DateTime.new(2000, 01, 01, 15, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 16, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[0].id,
      reception_start_time: DateTime.new(2000, 01, 01, 16, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 17, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[0].id,
      reception_start_time: DateTime.new(2000, 01, 01, 17, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 18, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[0].id,
      reception_start_time: DateTime.new(2000, 01, 01, 18, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 19, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[1].id,
      reception_start_time: DateTime.new(2000, 01, 01, 10, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 11, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[1].id,
      reception_start_time: DateTime.new(2000, 01, 01, 11, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 12, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[1].id,
      reception_start_time: DateTime.new(2000, 01, 01, 13, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 14, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[1].id,
      reception_start_time: DateTime.new(2000, 01, 01, 14, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 15, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[1].id,
      reception_start_time: DateTime.new(2000, 01, 01, 15, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 16, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[1].id,
      reception_start_time: DateTime.new(2000, 01, 01, 16, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 17, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[1].id,
      reception_start_time: DateTime.new(2000, 01, 01, 17, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 18, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[1].id,
      reception_start_time: DateTime.new(2000, 01, 01, 18, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 19, 0, 0, "+09:00"),
    },
  ]
)

ReserveFrameResource.first_or_create!(
  [
    {
      reserve_frame_id: reserve_frames[0].id,
      resource_id: resources[0].id
    },
    {
      reserve_frame_id: reserve_frames[0].id,
      resource_id: resources[1].id
    },
    {
      reserve_frame_id: reserve_frames[0].id,
      resource_id: resources[0].id
    }
  ]
)

ticket_master = TicketMaster.first_or_create!(
  account_id: account.id,
  name: "受講券デモ",
  issue_number: 1000,
  price: 5000,
  publish_status: "Publish"
)

monthly_payment_plan = MonthlyPaymentPlan.first_or_create!(
    account_id: account.id,
    name: "受講券デモ",
    price: 5000,
    reserve_interval_number: 1,
    reserve_interval_unit: "Week",
    enable_reserve_count: 3,
    publish_status: "Publish",
    stripe_plan_id: "plan_N70Y45NasdEyfE"
)

ReserveFrameMonthlyPaymentPlan.first_or_create!(
  [
    {
      reserve_frame_id: reserve_frames[0].id,
      monthly_payment_plan_id: monthly_payment_plan.id,
    }
  ]
)

ReserveFrameTicketMaster.first_or_create!(
  [
    {
      reserve_frame_id: reserve_frames[0].id,
      ticket_master_id: ticket_master.id,
    }
  ]
)

product = Product.first_or_create!(
  [
    {
      account_id: account.id,
      name: "商品デモ",
      price: 1000,
      tax_rate: 10,
      inventory: 100,
      publish_status: "Publish",
    },
    {
      account_id: account.id,
      name: "商品種別ありデモ",
      price: 1000,
      tax_rate: 10,
      inventory: 100,
      publish_status: "Publish",
    },
  ]
)

ProductType.first_or_create!(
  [
    {
      product_id: product[1].id,
      name: "Sサイズ",
      inventory: 100,
    },
    {
      product_id: product[1].id,
      name: "Mサイズ",
      inventory: 100,
    }
  ]
)

questionnaire_master = QuestionnaireMaster.first_or_create!(
  account_id: account.id,
  title: "アンケートデモ",
  question_form_json: "[{\"question\"=>\"商品へのご要望\", \"formType\"=>\"text\", \"textFormRowCount\"=>5, \"sortOrder\"=>1, \"questionId\"=>\"18581acf0bb\", \"selectFormAnswers\"=>[], \"radioButtonAnswers\"=>[], \"checkboxAnswers\"=>[]}, {\"question\"=>\"年齢は？\", \"formType\"=>\"select\", \"textFormRowCount\"=>1, \"sortOrder\"=>2, \"questionId\"=>\"18581ad6be4\", \"selectFormAnswers\"=>[\"10代\", \"20代\", \"30代\", \"40代\", \"50代\", \"60代以上\"], \"radioButtonAnswers\"=>[], \"checkboxAnswers\"=>[]}]",
  publish_status: "Publish"
)

DeliveryDatetimeSetting.first_or_create!(
  account_id: account.id,
  shortest_delivery_day: 2,
  longest_delivery_day: 4,
  deadline_time: DateTime.new(2000, 01, 01, 19, 0, 0, "+09:00"),
  is_set_per_area_delivery_date: true,
  is_holiday_sun: true,
  is_holiday_mon: false,
  is_holiday_tue: false,
  is_holiday_wed: false,
  is_holiday_thu: false,
  is_holiday_fri: false,
  is_holiday_sat: true,
  delivery_time_type: "yamato",
)
