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

account_s3_images = AccountS3Image.first_or_create!(
  [
    {
      account_id: account.id,
      s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/fitness_image1.jpeg",
      s3_object_name: "fitness_image1.jpeg",
    },
    {
      account_id: account.id,
      s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/fitness_image2.jpeg",
      s3_object_name: "fitness_image2.jpeg",
    },
    {
      account_id: account.id,
      s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/fitness_image3.jpeg",
      s3_object_name: "fitness_image3.jpeg",
    },
    {
      account_id: account.id,
      s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/fitness_image4.jpeg",
      s3_object_name: "fitness_image4.jpeg",
    },
    {
      account_id: account.id,
      s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/fitness_image5.jpeg",
      s3_object_name: "fitness_image5.jpeg",
    },
    {
      account_id: account.id,
      s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/fitness_image6.jpeg",
      s3_object_name: "fitness_image6.jpeg",
    },
    {
      account_id: account.id,
      s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/fitness_image7.jpeg",
      s3_object_name: "fitness_image7.jpeg",
    },
    {
      account_id: account.id,
      s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/yoga_image1.jpeg",
      s3_object_name: "yoga_image1.jpeg",
    },
    {
      account_id: account.id,
      s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/product_image1.jpeg",
      s3_object_name: "product_image1.jpeg",
    },
    {
      account_id: account.id,
      s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/golf_image1.jpeg",
      s3_object_name: "golf_image1.jpeg",
    },
    {
      account_id: account.id,
      s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/bouldering_image1.jpeg",
      s3_object_name: "bouldering_image1.jpeg",
    },
    {
      account_id: account.id,
      s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/seitai_image1.jpeg",
      s3_object_name: "seitai_image1.jpeg",
    },
  ]
)

shops = Shop.first_or_create!(
  [
    {
      account_id: account.id,
      name: "デモ店舗",
      phone_number: "09011112222",
      description1: "初心者からアスリートまで、全ての人々が結果を出せるようあらゆることについて考え抜かれたフィットネスクラブです。",
      description2: "生活スタイルに合った会員プランで、無理なく無駄なく続けられます。",
      description3: "身体も気持ちも100パーセント満足できます",
      description4: "サウナ、岩盤浴があり、フィットネス前に身体を温めたり、フィットネス後のリラックスにもおススメです。",
      description5: "専門のスタッフによるストレッチ・アイシング・テーピングを受けることができます。",
      description6: "幅広い時間帯で営業しているため、出勤前や出勤後にトレーニングをすることができます。",
      postal_code: "150-0043",
      state: "東京都",
      city: "渋谷区",
      town: "道玄坂1丁目",
      line1: "10番8号",
      line2: "渋谷道玄坂東急ビル2F-C",
      access_info: "渋谷駅ハチ公前から徒歩5分",
      business_hours_text: "07:00～22:00。不定休",
      parking_lot_guidance: "有料の駐車場がございます。¥1200〜/日。",
      remarks: "シューズ貸出あり",
      shop_image1_account_s3_image_id: account_s3_images[0].id,
      shop_image2_account_s3_image_id: account_s3_images[1].id,
      shop_image3_account_s3_image_id: account_s3_images[2].id,
      shop_image4_account_s3_image_id: account_s3_images[3].id,
      shop_image5_account_s3_image_id: account_s3_images[4].id,
      shop_image6_account_s3_image_id: account_s3_images[5].id,
    },
  ]
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
      title: "予約メニューデモ。曜日繰り返し",
      start_at: Time.zone.now,
      description: "デモ用予約メニュー01\n\nこれはデモ用の予約メニューです。",
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
      lottery_confirmed_day_before: 1,
      image1_account_s3_image_id: account_s3_images[6].id
    },
    {
      account_id: account.id,
      title: "予約メニューデモ。毎日繰り返し",
      start_at: Time.zone.now,
      description: "デモ用予約メニュー01\n\nこれはデモ用の予約メニューです。",
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
      lottery_confirmed_day_before: 1,
      image1_account_s3_image_id: account_s3_images[7].id
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

ShopReserveFrame.first_or_create!(
  [
    {
      shop_id: shops[0].id,
      reserve_frame_id: reserve_frames[0].id
    },
    {
      shop_id: shops[0].id,
      reserve_frame_id: reserve_frames[1].id
    },
  ]
)

ticket_masters = TicketMaster.first_or_create!(
  [
    {
      account_id: account.id,
      name: "回数券デモ",
      issue_number: 1000,
      price: 5000,
      publish_status: "Publish",
      effective_month: 12,
      image1_account_s3_image_id: account_s3_images[8].id
    },
  ]
)

ShopTicketMaster.first_or_create!(
  [
    {
      shop_id: shops[0].id,
      ticket_master_id: ticket_masters[0].id
    }
  ]
)

monthly_payment_plans = MonthlyPaymentPlan.first_or_create!(
  [
    {
      account_id: account.id,
      name: "月額サブスクリプションデモ",
      price: 5000,
      reserve_interval_number: 1,
      reserve_interval_unit: "Week",
      enable_reserve_count: 3,
      publish_status: "Publish",
      stripe_plan_id: "plan_N70Y45NasdEyfE",
      image1_account_s3_image_id: account_s3_images[9].id
    },
  ]
)

ShopMonthlyPaymentPlan.first_or_create!(
  [
    {
      shop_id: shops[0].id,
      monthly_payment_plan_id: monthly_payment_plans[0].id
    }
  ]
)

ReserveFrameMonthlyPaymentPlan.first_or_create!(
  [
    {
      reserve_frame_id: reserve_frames[0].id,
      monthly_payment_plan_id: monthly_payment_plans[0].id,
    }
  ]
)

ReserveFrameTicketMaster.first_or_create!(
  [
    {
      reserve_frame_id: reserve_frames[0].id,
      ticket_master_id: ticket_masters[0].id,
      consume_number: 3
    }
  ]
)

products = Product.first_or_create!(
  [
    {
      account_id: account.id,
      name: "商品デモ",
      price: 1000,
      tax_rate: 10,
      inventory: 100,
      publish_status: "Publish",
      image1_account_s3_image_id: account_s3_images[8].id
    },
    {
      account_id: account.id,
      name: "商品種別ありデモ",
      price: 1000,
      tax_rate: 10,
      inventory: 100,
      publish_status: "Publish",
      image1_account_s3_image_id: account_s3_images[9].id
    },
  ]
)

ProductType.first_or_create!(
  [
    {
      product_id: products[1].id,
      name: "Sサイズ",
      inventory: 100,
    },
    {
      product_id: products[1].id,
      name: "Mサイズ",
      inventory: 100,
    }
  ]
)

ShopProduct.first_or_create!(
  [
    {
      shop_id: shops[0].id,
      product_id: products[0].id
    },
    {
      shop_id: shops[0].id,
      product_id: products[1].id
    }
  ]
)

questionnaire_master = QuestionnaireMaster.first_or_create!(
  account_id: account.id,
  title: "アンケートデモ",
  question_form_json: "[{\"question\"=>\"商品へのご要望\", \"formType\"=>\"text\", \"textFormRowCount\"=>5, \"sortOrder\"=>1, \"questionId\"=>\"18581acf0bb\", \"selectFormAnswers\"=>[], \"radioButtonAnswers\"=>[], \"checkboxAnswers\"=>[]}, {\"question\"=>\"年齢は？\", \"formType\"=>\"select\", \"textFormRowCount\"=>1, \"sortOrder\"=>2, \"questionId\"=>\"18581ad6be4\", \"selectFormAnswers\"=>[\"10代\", \"20代\", \"30代\", \"40代\", \"50代\", \"60代以上\"], \"radioButtonAnswers\"=>[], \"checkboxAnswers\"=>[]}]",
  publish_status: "Publish"
)

delivery_datetime_setting = DeliveryDatetimeSetting.first_or_create!(
  account_id: account.id,
  shortest_delivery_day: 2,
  longest_delivery_day: 4,
  deadline_time: DateTime.new(2000, 01, 01, 19, 0, 0, "+09:00"),
  is_set_per_area_delivery_date: false,
  is_holiday_sun: true,
  is_holiday_mon: false,
  is_holiday_tue: false,
  is_holiday_wed: false,
  is_holiday_thu: false,
  is_holiday_fri: false,
  is_holiday_sat: true,
  delivery_time_type: "yamato",
)

AdditionalDeliveryDaysPerRegion.create(
  [
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "北海道",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "青森県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "岩手県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "宮城県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "秋田県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "山形県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "福島県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "茨城県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "栃木県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "群馬県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "埼玉県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "千葉県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "東京都",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "神奈川県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "新潟県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "富山県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "石川県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "福井県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "山梨県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "長野県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "岐阜県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "静岡県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "愛知県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "三重県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "滋賀県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "京都府",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "大阪府",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "兵庫県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "奈良県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "和歌山県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "鳥取県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "島根県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "岡山県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "広島県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "山口県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "徳島県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "香川県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "愛媛県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "高知県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "福岡県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "佐賀県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "長崎県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "熊本県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "大分県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "宮崎県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "鹿児島県",
      additional_delivery_days: 1
    },
    {
      delivery_datetime_setting_id: delivery_datetime_setting.id,
      region: "沖縄県",
      additional_delivery_days: 1
    }
  ]
)
