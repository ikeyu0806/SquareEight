# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

account = Account.create!(
  business_name: "管理ユーザ",
  stripe_customer_id: "cus_LwJxeaXaTnVjba",
  stripe_account_id: "acct_1LFYYj2eLQ63YTOo"
)

MerchantUser.create!(
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
  allow_read_shop: "Allow",
  allow_create_shop: "Allow",
  allow_update_shop: "Allow",
  allow_delete_shop: "Allow",
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

EndUser.create!(
  first_name: "デモ",
  last_name: "ユーザ",
  email: "end_user@develop.com",
  password: "Pass1234",
  stripe_customer_id: "cus_M9qiqO8wOda3Xo",
  email_authentication_status: "Enabled"
)

SystemAdminUser.create!(
  name: "admin_user",
  email: "system_admin@develop.com",
  phone_number: "12312341234",
  password: "Pass1234",
  authentication_status: "Enabled"
)

fitness_image1 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/fitness_image1.jpeg",
  s3_object_name: "fitness_image1.jpeg",
)

fitness_image2 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/fitness_image2.jpeg",
  s3_object_name: "fitness_image2.jpeg",
)

fitness_image3 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/fitness_image3.jpeg",
  s3_object_name: "fitness_image3.jpeg",
)

fitness_image4 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/fitness_image4.jpeg",
  s3_object_name: "fitness_image4.jpeg",
)

fitness_image5 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/fitness_image5.jpeg",
  s3_object_name: "fitness_image5.jpeg",
)

fitness_image6 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/fitness_image6.jpeg",
  s3_object_name: "fitness_image6.jpeg",
)

fitness_image7 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/fitness_image7.jpeg",
  s3_object_name: "fitness_image7.jpeg",
)

yoga_image1 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/yoga_image1.jpeg",
  s3_object_name: "yoga_image1.jpeg",
)

yoga_mat_image1 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/yoga_mat_image1.jpeg",
  s3_object_name: "yoga_mat_image1.jpeg",
)

product_image1 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/product_image1.jpeg",
  s3_object_name: "product_image1.jpeg",
)

golf_image1 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/golf_image1.jpeg",
  s3_object_name: "golf_image1.jpeg",
)

bouldering_image1 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/bouldering_image1.jpeg",
  s3_object_name: "bouldering_image1.jpeg",
)

seitai_image1 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/seitai_image1.jpeg",
  s3_object_name: "seitai_image1.jpeg",
)

tennis_image1 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/tennis_image1.jpeg",
  s3_object_name: "tennis_image1.jpeg",
)

outdoor_tennis_court_image1 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/outdoor_tennis_court_image1.jpeg",
  s3_object_name: "outdoor_tennis_court_image1.jpeg",
)

spa_image1 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/spa_image1.jpeg",
  s3_object_name: "spa_image1.jpeg",
)

nail_image1 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/nail_image1.jpeg",
  s3_object_name: "nail_image1.jpeg",
)

candle_image1 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/candle_image1.jpeg",
  s3_object_name: "candle_image1.jpeg",
)

protain_image1 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/protain_image1.jpeg",
  s3_object_name: "protain_image1.jpeg",
)

candle_image1 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/candle_image1.jpeg",
  s3_object_name: "candle_image1.jpeg",
)

sports_shoes_image1 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/sports_shoes_image1.jpeg",
  s3_object_name: "sports_shoes_image1.jpeg",
)

golf_goods_image1 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/golf_goods_image1.jpeg",
  s3_object_name: "golf_goods_image1.jpeg",
)

gold_simulation_image1 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/gold_simulation_image1.jpeg",
  s3_object_name: "gold_simulation_image1.jpeg",
)

sauna_image1 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/candle_image1.jpeg",
  s3_object_name: "sauna_image1.jpeg",
)

personal_souna_image1 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/personal_souna_image1.jpeg",
  s3_object_name: "personal_souna_image1.jpeg",
)

personal_trainer_image1 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/personal_trainer_image1.jpeg",
  s3_object_name: "personal_trainer_image1.jpeg",
)

girl_outdoor_image1 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/girl_outdoor_image1.jpeg",
  s3_object_name: "girl_outdoor_image1.jpeg",
)

bouldering_image1 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/bouldering_image1.jpeg",
  s3_object_name: "bouldering_image1.jpeg",
)

haircut_image1 = AccountS3Image.create!(
  account_id: account.id,
  s3_object_public_url: "https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/haircut_image1.jpeg",
  s3_object_name: "haircut_image1.jpeg",
)


shops = Shop.create!(
  [
    {
      account_id: account.id,
      name: "SquareEightデモページ",
      phone_number: "09011112222",
      description1: "初心者からアスリートまで、全ての人々が結果を出せるようあらゆることについて考え抜かれたフィットネスクラブです。",
      description2: "生活スタイルに合った会員プランで、無理なく無駄なく続けられます。",
      description3: "インドアアウトドアテニスコート3面、アウトドアテニスコート5面を備えております。",
      description4: "サウナ、岩盤浴があり、フィットネス前に身体を温めたり、フィットネス後のリラックスにもおススメです。",
      description5: "経験豊富なパーソナルトレーナーが、お客様のご希望に沿った最適なトレーニングプログラムをご提案します。",
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
      publish_status: "Publish",
      shop_image1_account_s3_image_id: fitness_image1.id,
      shop_image2_account_s3_image_id: fitness_image2.id,
      shop_image3_account_s3_image_id: tennis_image1.id,
      shop_image4_account_s3_image_id: sauna_image1.id,
      shop_image5_account_s3_image_id: fitness_image3.id,
      shop_image6_account_s3_image_id: fitness_image6.id,
    },
  ]
)

SharedComponent.create!(
  account_id: account.id,
)

customers = Customer.create!(
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

customer_group = CustomerGroup.create!(
  account_id: account.id,
  name: "デモグループ",
)

CustomerGroupRelation.create!(
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

resources = Resource.create!(
  [
    {
      account_id: account.id,
      name: "ヨガマット",
      description: '無料でヨガマット貸し出しております。',
      quantity: 20,
      resource_type: 'Equipment',
      is_show_reserve_page: true,
      resource_image1_account_s3_image_id: yoga_mat_image1.id,
      resource_image2_account_s3_image_id: yoga_mat_image1.id,
      resource_image3_account_s3_image_id: yoga_mat_image1.id,
      resource_image4_account_s3_image_id: yoga_mat_image1.id,
      resource_image5_account_s3_image_id: yoga_mat_image1.id,
    },
    {
      account_id: account.id,
      name: "ゴルフシュミレーター",
      description: '完全個室のプライベートゴルフ練習場を備えております。',
      quantity: 4,
      resource_type: 'Equipment',
      is_show_reserve_page: true,
      resource_image1_account_s3_image_id: gold_simulation_image1.id,
      resource_image2_account_s3_image_id: gold_simulation_image1.id,
      resource_image3_account_s3_image_id: gold_simulation_image1.id,
      resource_image4_account_s3_image_id: gold_simulation_image1.id,
      resource_image5_account_s3_image_id: gold_simulation_image1.id,
    },
    {
      account_id: account.id,
      name: "アウトドアテニスコート",
      description: 'セミハードコート8面を備えたアウトドアテニスコートを備えております。',
      quantity: 32,
      resource_type: 'Equipment',
      is_show_reserve_page: true,
      resource_image1_account_s3_image_id: outdoor_tennis_court_image1.id,
      resource_image2_account_s3_image_id: outdoor_tennis_court_image1.id,
      resource_image3_account_s3_image_id: outdoor_tennis_court_image1.id,
      resource_image4_account_s3_image_id: outdoor_tennis_court_image1.id,
      resource_image5_account_s3_image_id: outdoor_tennis_court_image1.id,
    },
    {
      account_id: account.id,
      name: "個室サウナ",
      description: '貸切タイプの個室サウナ施設を備えております。',
      quantity: 1,
      resource_type: 'Equipment',
      is_show_reserve_page: true,
      resource_image1_account_s3_image_id: personal_souna_image1.id,
      resource_image2_account_s3_image_id: personal_souna_image1.id,
      resource_image3_account_s3_image_id: personal_souna_image1.id,
      resource_image4_account_s3_image_id: personal_souna_image1.id,
      resource_image5_account_s3_image_id: personal_souna_image1.id,
    },
    {
      account_id: account.id,
      name: "デモスタッフ",
      description: "美容師歴15年。指名数、No.1。あなたにピッタリのヘアスタイルを提案します。",
      quantity: 1,
      resource_type: 'Staff',
      is_show_reserve_page: true,
      resource_image1_account_s3_image_id: haircut_image1.id,
      resource_image2_account_s3_image_id: haircut_image1.id,
      resource_image3_account_s3_image_id: haircut_image1.id,
      resource_image4_account_s3_image_id: haircut_image1.id,
      resource_image5_account_s3_image_id: haircut_image1.id,
    },
    {
      account_id: account.id,
      name: "デモスタッフ",
      description: "美容師歴5年。色系ヘアカラーお任せ下さい",
      quantity: 1,
      resource_type: 'Staff',
      is_show_reserve_page: true,
      resource_image1_account_s3_image_id: haircut_image1.id,
      resource_image2_account_s3_image_id: haircut_image1.id,
      resource_image3_account_s3_image_id: haircut_image1.id,
      resource_image4_account_s3_image_id: haircut_image1.id,
      resource_image5_account_s3_image_id: haircut_image1.id,
    },
    {
      account_id: account.id,
      name: "デモスタッフ",
      description: "パーソナルトレーニングで理想の体づくりのお手伝いをさせていただきます。",
      quantity: 1,
      resource_type: 'Staff',
      is_show_reserve_page: true,
      resource_image1_account_s3_image_id: personal_trainer_image1.id,
      resource_image2_account_s3_image_id: personal_trainer_image1.id,
      resource_image3_account_s3_image_id: personal_trainer_image1.id,
      resource_image4_account_s3_image_id: personal_trainer_image1.id,
      resource_image5_account_s3_image_id: personal_trainer_image1.id,
    },
    {
      account_id: account.id,
      name: "デモスタッフ",
      description: "明るく楽しくレッスンいたします。大学在籍中に日本学生ゴルフ選手権優勝経験あり。",
      quantity: 1,
      resource_type: 'Staff',
      is_show_reserve_page: true,
      resource_image1_account_s3_image_id: personal_trainer_image1.id,
      resource_image2_account_s3_image_id: personal_trainer_image1.id,
      resource_image3_account_s3_image_id: personal_trainer_image1.id,
      resource_image4_account_s3_image_id: personal_trainer_image1.id,
      resource_image5_account_s3_image_id: personal_trainer_image1.id,
    },

  ]
)

ShopResource.create!(
  [
    {
      shop_id: shops[0].id,
      resource_id: resources[0].id
    },
    {
      shop_id: shops[0].id,
      resource_id: resources[1].id
    },
    {
      shop_id: shops[0].id,
      resource_id: resources[2].id
    },
    {
      shop_id: shops[0].id,
      resource_id: resources[3].id
    },
    {
      shop_id: shops[0].id,
      resource_id: resources[4].id
    },
    {
      shop_id: shops[0].id,
      resource_id: resources[5].id
    },
    {
      shop_id: shops[0].id,
      resource_id: resources[6].id
    },
    {
      shop_id: shops[0].id,
      resource_id: resources[7].id
    },
  ]
)

reserve_frames = ReserveFrame.create!(
  [
    {
      account_id: account.id,
      title: "〇〇先生パーソナルトレーニング60分コース",
      start_at: Time.zone.now,
      description: "【デモ用の予約メニューです】\n\n〇〇先生のパーソナルトレーニング60分コース\n\nトレーナーが1つ1つを確認しながら行うので効率よくトレーニングを進めることができます。\n\nトレーニングウェアと室内シューズをお持ちください。",
      is_repeat: true,
      repeat_interval_type: "WDay",
      repeat_interval_number_day: 1,
      repeat_interval_number_week: 1,
      repeat_interval_number_month: 1,
      repeat_interval_month_date: 1,
      repeat_end_date: Time.zone.now + 10.years,
      capacity: 10,
      local_payment_price: 4980,
      publish_status: "Publish",
      reception_type: "Immediate",
      reception_start_day_before: 180,
      reception_deadline: "OnlyOnTheDay",
      reception_deadline_hour_before: 1,
      reception_deadline_day_before: 1,
      is_local_payment_enable: true,
      is_ticket_payment_enable: true,
      is_monthly_plan_payment_enable: true,
      credit_card_payment_price: 2980,
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
      image1_account_s3_image_id: fitness_image1.id,
      image2_account_s3_image_id: fitness_image2.id,
      image3_account_s3_image_id: fitness_image2.id,
      image4_account_s3_image_id: fitness_image2.id,
      image5_account_s3_image_id: fitness_image2.id,
    },
    {
      account_id: account.id,
      title: "アロマリンパ60分コース",
      start_at: Time.zone.now,
      description: "【デモ用の予約メニューです】\n\n当店人気No1のアロマリンパコースになります。\n\m肩こり.腰痛の改善、小顔効果が期待できます。\n\nお客様の体調に合わせて丁寧にご案内・施術いたします。",
      is_repeat: true,
      repeat_interval_type: "Day",
      repeat_interval_number_day: 1,
      repeat_interval_number_week: 1,
      repeat_interval_number_month: 1,
      repeat_interval_month_date: 1,
      repeat_end_date: Time.zone.now + 10.years,
      capacity: 10,
      local_payment_price: 2980,
      publish_status: "Publish",
      reception_type: "Immediate",
      reception_start_day_before: 180,
      reception_deadline: "OnlyOnTheDay",
      reception_deadline_hour_before: 1,
      reception_deadline_day_before: 1,
      is_local_payment_enable: true,
      is_ticket_payment_enable: true,
      is_monthly_plan_payment_enable: true,
      credit_card_payment_price: 2980,
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
      image1_account_s3_image_id: spa_image1.id,
      image2_account_s3_image_id: candle_image1.id,
      image3_account_s3_image_id: candle_image1.id,
      image4_account_s3_image_id: candle_image1.id,
      image5_account_s3_image_id: candle_image1.id,
    },
    {
      account_id: account.id,
      title: "カヤック体験60分コース",
      start_at: Time.zone.now,
      description: "【デモ用の予約メニューです】\n\n必要な用具は全てお貸します。\n\n未経験でも知識豊富なガイドが丁寧にレクチャーします。",
      is_repeat: true,
      repeat_interval_type: "Day",
      repeat_interval_number_day: 1,
      repeat_interval_number_week: 1,
      repeat_interval_number_month: 1,
      repeat_interval_month_date: 1,
      repeat_end_date: Time.zone.now + 10.years,
      capacity: 10,
      local_payment_price: 2980,
      publish_status: "Publish",
      reception_type: "Immediate",
      reception_start_day_before: 180,
      reception_deadline: "OnlyOnTheDay",
      reception_deadline_hour_before: 1,
      reception_deadline_day_before: 1,
      is_local_payment_enable: true,
      is_ticket_payment_enable: true,
      is_monthly_plan_payment_enable: true,
      credit_card_payment_price: 2980,
      is_credit_card_payment_enable: true,
      is_every_day_repeat: true,
      is_every_week_repeat: true,
      is_every_month_repeat: true,
      reception_phone_number: "",
      is_set_price: true,
      is_repeat_sun: true,
      is_repeat_mon: true,
      is_repeat_tue: true,
      is_repeat_wed: true,
      is_repeat_thu: true,
      is_repeat_fri: true,
      is_repeat_sat: true,
      deleted_at: nil,
      questionnaire_master_id: nil,
      is_accept_cancel: true,
      is_accept_cancel_on_the_day: false,
      cancel_reception_day_before: 1,
      cancel_reception_hour_before: 1,
      lottery_confirmed_day_before: 1,
      image1_account_s3_image_id: girl_outdoor_image1.id,
      image2_account_s3_image_id: fitness_image4.id,
      image3_account_s3_image_id: fitness_image4.id,
      image4_account_s3_image_id: fitness_image4.id,
      image5_account_s3_image_id: fitness_image4.id,
    },
    {
      account_id: account.id,
      title: "ボルダリング体験60分コース",
      start_at: Time.zone.now,
      description: "【デモ用の予約メニューです】\n\n動きやすい服装でお越しください。シューズ・チョークはお貸します。\n\n登り方の基本は詳しくレクチャーします。",
      is_repeat: true,
      repeat_interval_type: "Day",
      repeat_interval_number_day: 1,
      repeat_interval_number_week: 1,
      repeat_interval_number_month: 1,
      repeat_interval_month_date: 1,
      repeat_end_date: Time.zone.now + 10.years,
      capacity: 10,
      local_payment_price: 2980,
      publish_status: "Publish",
      reception_type: "Immediate",
      reception_start_day_before: 180,
      reception_deadline: "OnlyOnTheDay",
      reception_deadline_hour_before: 1,
      reception_deadline_day_before: 1,
      is_local_payment_enable: true,
      is_ticket_payment_enable: true,
      is_monthly_plan_payment_enable: true,
      credit_card_payment_price: 2980,
      is_credit_card_payment_enable: true,
      is_every_day_repeat: true,
      is_every_week_repeat: true,
      is_every_month_repeat: true,
      reception_phone_number: "",
      is_set_price: true,
      is_repeat_sun: true,
      is_repeat_mon: true,
      is_repeat_tue: true,
      is_repeat_wed: true,
      is_repeat_thu: true,
      is_repeat_fri: true,
      is_repeat_sat: true,
      deleted_at: nil,
      questionnaire_master_id: nil,
      is_accept_cancel: true,
      is_accept_cancel_on_the_day: false,
      cancel_reception_day_before: 1,
      cancel_reception_hour_before: 1,
      lottery_confirmed_day_before: 1,
      image1_account_s3_image_id: bouldering_image1.id,
      image2_account_s3_image_id: fitness_image4.id,
      image3_account_s3_image_id: fitness_image4.id,
      image4_account_s3_image_id: fitness_image4.id,
      image5_account_s3_image_id: fitness_image4.id,
    },
  ]
)

ReserveFrameReceptionTime.create!(
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
    {
      reserve_frame_id: reserve_frames[2].id,
      reception_start_time: DateTime.new(2000, 01, 01, 10, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 11, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[2].id,
      reception_start_time: DateTime.new(2000, 01, 01, 11, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 12, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[2].id,
      reception_start_time: DateTime.new(2000, 01, 01, 13, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 14, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[2].id,
      reception_start_time: DateTime.new(2000, 01, 01, 14, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 15, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[2].id,
      reception_start_time: DateTime.new(2000, 01, 01, 15, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 16, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[2].id,
      reception_start_time: DateTime.new(2000, 01, 01, 16, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 17, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[2].id,
      reception_start_time: DateTime.new(2000, 01, 01, 17, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 18, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[2].id,
      reception_start_time: DateTime.new(2000, 01, 01, 18, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 19, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[3].id,
      reception_start_time: DateTime.new(2000, 01, 01, 10, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 11, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[3].id,
      reception_start_time: DateTime.new(2000, 01, 01, 11, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 12, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[3].id,
      reception_start_time: DateTime.new(2000, 01, 01, 13, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 14, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[3].id,
      reception_start_time: DateTime.new(2000, 01, 01, 14, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 15, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[3].id,
      reception_start_time: DateTime.new(2000, 01, 01, 15, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 16, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[3].id,
      reception_start_time: DateTime.new(2000, 01, 01, 16, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 17, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[3].id,
      reception_start_time: DateTime.new(2000, 01, 01, 17, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 18, 0, 0, "+09:00"),
    },
    {
      reserve_frame_id: reserve_frames[3].id,
      reception_start_time: DateTime.new(2000, 01, 01, 18, 0, 0, "+09:00"),
      reception_end_time: DateTime.new(2000, 01, 01, 19, 0, 0, "+09:00"),
    },
  ]
)

ReserveFrameResource.create!(
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

ShopReserveFrame.create!(
  [
    {
      shop_id: shops[0].id,
      reserve_frame_id: reserve_frames[0].id
    },
    {
      shop_id: shops[0].id,
      reserve_frame_id: reserve_frames[1].id
    },
    {
      shop_id: shops[0].id,
      reserve_frame_id: reserve_frames[2].id
    },
    {
      shop_id: shops[0].id,
      reserve_frame_id: reserve_frames[3].id
    },
  ]
)

ticket_masters = TicketMaster.create!(
  [
    {
      account_id: account.id,
      name: "【デモ用の回数券です】テニススクール受講回数券　5回分",
      description: "自分のレベルに合ったクラスが選べる受講回数券です。\n\n有効期限は1年。好きな時に気軽に通えます。",
      issue_number: 5,
      price: 19800,
      publish_status: "Publish",
      effective_month: 12,
      image1_account_s3_image_id: tennis_image1.id
    },
    {
      account_id: account.id,
      name: "【デモ用の回数券です】ハンドネイル回数券　5回分",
      description: "ケア、マニキュア、ジェルのご予約に使える受講回数券です。\n\nお客様のご要望に合わせたサービスを提供します。",
      issue_number: 5,
      price: 4980,
      publish_status: "Publish",
      effective_month: 12,
      image1_account_s3_image_id: nail_image1.id
    },
    {
      account_id: account.id,
      name: "【デモ用の回数券です】リンパマッサージ回数券 10回分。",
      description: "リンパマッサージを10回分ご利用になれる回数券です。\n\その日の症状に合わせたリンパマッサージ。",
      issue_number: 10,
      price: 29800,
      publish_status: "Publish",
      effective_month: 12,
      image1_account_s3_image_id: spa_image1.id
    },
    {
      account_id: account.id,
      name: "【デモ用の回数券です】ヨガレッスン受講回数券　10回分",
      description: "肩こりや腰痛の解消、ダイエットにおすすめのヨガレッスン受講券です。\n\n有効期限は1年。好きな時に気軽に通えます。",
      issue_number: 10,
      price: 19800,
      publish_status: "Publish",
      effective_month: 12,
      image1_account_s3_image_id: yoga_image1.id
    },
  ]
)

ShopTicketMaster.create!(
  [
    {
      shop_id: shops[0].id,
      ticket_master_id: ticket_masters[0].id
    },
    {
      shop_id: shops[0].id,
      ticket_master_id: ticket_masters[1].id
    },
    {
      shop_id: shops[0].id,
      ticket_master_id: ticket_masters[2].id
    },
    {
      shop_id: shops[0].id,
      ticket_master_id: ticket_masters[3].id
    }
  ]
)

monthly_payment_plans = MonthlyPaymentPlan.create!(
  [
    {
      account_id: account.id,
      name: "【デモ用のサブスクリプションです】フィットネスジム週1回ご利用プラン",
      description: "気軽にジム通いを始めたい方向けのライトプラン!\n\nまずはここから!",
      price: 4980,
      reserve_interval_number: 1,
      reserve_interval_unit: "Week",
      enable_reserve_count: 1,
      publish_status: "Publish",
      stripe_plan_id: "plan_NGHKsOaX2xdpn2",
      image1_account_s3_image_id: fitness_image2.id,
      image2_account_s3_image_id: fitness_image4.id,
      image3_account_s3_image_id: fitness_image4.id,
      image4_account_s3_image_id: fitness_image4.id,
      image5_account_s3_image_id: fitness_image4.id,
    },
    {
      account_id: account.id,
      name: "【デモ用のサブスクリプションです】フィットネス施設使い放題プラン",
      description: "トレーニングマシンを利用時間や回数制限なく利用できるおトクなプラン。\n\n平日も土日祝も終日使い放題。",
      price: 49800,
      reserve_interval_number: 1,
      reserve_interval_unit: "Week",
      enable_reserve_count: 3,
      publish_status: "Publish",
      stripe_plan_id: "plan_NGHQ2VISmebLWc",
      image1_account_s3_image_id: fitness_image3.id,
      image2_account_s3_image_id: fitness_image4.id,
      image3_account_s3_image_id: fitness_image4.id,
      image4_account_s3_image_id: fitness_image4.id,
      image5_account_s3_image_id: fitness_image4.id,
    },
    {
      account_id: account.id,
      name: "【デモ用のサブスクリプションです】週３回受講可能ゴルフスクール会員",
      description: "プロ選手による少人数レッスン受講プラン。\n\n最新機器により効率よく上達できます。",
      price: 49800,
      reserve_interval_number: 1,
      reserve_interval_unit: "Week",
      enable_reserve_count: 3,
      publish_status: "Publish",
      stripe_plan_id: "plan_N70Y45NasdEyfE",
      image1_account_s3_image_id: golf_image1.id,
      image2_account_s3_image_id: fitness_image4.id,
      image3_account_s3_image_id: fitness_image4.id,
      image4_account_s3_image_id: fitness_image4.id,
      image5_account_s3_image_id: fitness_image4.id,
    },
    {
      account_id: account.id,
      name: "【デモ用のサブスクリプションです】2週に1回通えるスパ定期券",
      description: "2週間に1回ご利用になれる定額制サービスになります。\n\n60分のアロマオイルマッサージかヘッドスパをご予約できます。",
      price: 98000,
      reserve_interval_number: 2,
      reserve_interval_unit: "Week",
      enable_reserve_count: 1,
      publish_status: "Publish",
      stripe_plan_id: "plan_NGHiD5NscrVH7Z",
      image1_account_s3_image_id: spa_image1.id,
      image2_account_s3_image_id: fitness_image4.id,
      image3_account_s3_image_id: fitness_image4.id,
      image4_account_s3_image_id: fitness_image4.id,
      image5_account_s3_image_id: fitness_image4.id,
    },
  ]
)

ShopMonthlyPaymentPlan.create!(
  [
    {
      shop_id: shops[0].id,
      monthly_payment_plan_id: monthly_payment_plans[0].id
    },
    {
      shop_id: shops[0].id,
      monthly_payment_plan_id: monthly_payment_plans[1].id
    },
    {
      shop_id: shops[0].id,
      monthly_payment_plan_id: monthly_payment_plans[2].id
    },
    {
      shop_id: shops[0].id,
      monthly_payment_plan_id: monthly_payment_plans[3].id
    }
  ]
)

ReserveFrameMonthlyPaymentPlan.create!(
  [
    {
      reserve_frame_id: reserve_frames[0].id,
      monthly_payment_plan_id: monthly_payment_plans[0].id,
    },
  ]
)

ReserveFrameTicketMaster.create!(
  [
    {
      reserve_frame_id: reserve_frames[0].id,
      ticket_master_id: ticket_masters[0].id,
      consume_number: 3
    }
  ]
)

products = Product.create!(
  [
    {
      account_id: account.id,
      name: "【デモ用の商品です】プロテインセット",
      description: "たんぱく質を効率的に摂取できるサプリメントになります。",
      price: 3980,
      tax_rate: 10,
      inventory: 100,
      publish_status: "Publish",
      image1_account_s3_image_id: protain_image1.id
    },
    {
      account_id: account.id,
      name: "【デモ用の商品です】ゴルフクラブセット",
      description: "必要なクラブ全てが揃う14本セットです。",
      price: 69800,
      tax_rate: 10,
      inventory: 30,
      publish_status: "Publish",
      image1_account_s3_image_id: golf_goods_image1.id
    },
    {
      account_id: account.id,
      name: "【デモ用の商品です】アロマキャンドルセット",
      description: "【デモ用の商品です】香りと炎のゆらめきを楽しめる柑橘系アロマキャンドルです。",
      price: 2980,
      tax_rate: 10,
      inventory: 30,
      publish_status: "Publish",
      image1_account_s3_image_id: candle_image1.id,
      image2_account_s3_image_id: candle_image1.id,
      image3_account_s3_image_id: candle_image1.id,
      image4_account_s3_image_id: candle_image1.id,
      image5_account_s3_image_id: candle_image1.id,
    },
    {
      account_id: account.id,
      name: "【デモ用の商品です】ランニングシューズ",
      description: "【デモ用の予約メニューです】Sサイズ、Mサイズ、Lサイズから選択して購入できます。",
      price: 1980,
      tax_rate: 10,
      inventory: 100,
      publish_status: "Publish",
      image1_account_s3_image_id: sports_shoes_image1.id,
      image2_account_s3_image_id: sports_shoes_image1.id,
      image3_account_s3_image_id: sports_shoes_image1.id,
      image4_account_s3_image_id: sports_shoes_image1.id,
      image5_account_s3_image_id: sports_shoes_image1.id,
    },
  ]
)

ProductType.create!(
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
    },
    {
      product_id: products[1].id,
      name: "Lサイズ",
      inventory: 100,
    }
  ]
)

ShopProduct.create!(
  [
    {
      shop_id: shops[0].id,
      product_id: products[0].id
    },
    {
      shop_id: shops[0].id,
      product_id: products[1].id
    },
    {
      shop_id: shops[0].id,
      product_id: products[2].id
    },
    {
      shop_id: shops[0].id,
      product_id: products[3].id
    }
  ]
)

questionnaire_master = QuestionnaireMaster.create!(
  account_id: account.id,
  title: "商品をご購入いただいた方へのアンケート",
  question_form_json: "[{\"question\"=>\"商品へのご要望\", \"formType\"=>\"text\", \"textFormRowCount\"=>5, \"sortOrder\"=>1, \"questionId\"=>\"18581acf0bb\", \"selectFormAnswers\"=>[], \"radioButtonAnswers\"=>[], \"checkboxAnswers\"=>[]}, {\"question\"=>\"年齢は？\", \"formType\"=>\"select\", \"textFormRowCount\"=>1, \"sortOrder\"=>2, \"questionId\"=>\"18581ad6be4\", \"selectFormAnswers\"=>[\"10代\", \"20代\", \"30代\", \"40代\", \"50代\", \"60代以上\"], \"radioButtonAnswers\"=>[], \"checkboxAnswers\"=>[]}]",
  publish_status: "Publish"
)

delivery_datetime_setting = DeliveryDatetimeSetting.create!(
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
