# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_01_22_065623) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "account_notifications", force: :cascade do |t|
    t.integer "account_id"
    t.string "title"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "url"
  end

  create_table "account_s3_images", force: :cascade do |t|
    t.integer "account_id", null: false
    t.string "s3_object_public_url", null: false
    t.string "s3_object_name", null: false
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "accounts", force: :cascade do |t|
    t.string "business_name"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "stripe_customer_id"
    t.string "stripe_account_id"
    t.string "selected_external_account_id"
    t.string "stripe_representative_person_id"
    t.integer "service_plan", default: 0
    t.string "stripe_subscription_id"
    t.datetime "deleted_at"
    t.integer "mcc"
    t.string "mcc_type"
  end

  create_table "additional_delivery_days_per_regions", force: :cascade do |t|
    t.integer "delivery_datetime_setting_id", null: false
    t.string "region", null: false
    t.integer "additional_delivery_days", default: 0
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cart_monthly_payment_plans", force: :cascade do |t|
    t.integer "account_id"
    t.integer "end_user_id"
    t.integer "monthly_payment_plan_id"
    t.integer "quantity"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cart_products", force: :cascade do |t|
    t.integer "account_id"
    t.integer "end_user_id"
    t.integer "product_id"
    t.integer "quantity"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "product_type_id"
  end

  create_table "cart_ticket_masters", force: :cascade do |t|
    t.integer "account_id"
    t.integer "end_user_id"
    t.integer "ticket_master_id"
    t.integer "quantity"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "custom_delivery_times", force: :cascade do |t|
    t.integer "delivery_datetime_setting_id", null: false
    t.time "start_at"
    t.time "end_at"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "customer_group_relations", force: :cascade do |t|
    t.integer "customer_id", null: false
    t.integer "customer_group_id", null: false
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "customer_groups", force: :cascade do |t|
    t.integer "account_id", null: false
    t.string "name", null: false
    t.integer "category", default: 0, null: false
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "customers", force: :cascade do |t|
    t.integer "end_user_id"
    t.string "first_name"
    t.string "last_name"
    t.string "first_name_kana"
    t.string "last_name_kana"
    t.string "email"
    t.string "phone_number"
    t.integer "gender"
    t.datetime "dob"
    t.text "custom_items_answer"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "account_id", null: false
    t.text "notes"
  end

  create_table "delivery_datetime_settings", force: :cascade do |t|
    t.integer "account_id", null: false
    t.integer "shortest_delivery_day"
    t.integer "longest_delivery_day"
    t.time "deadline_time"
    t.boolean "is_set_per_area_delivery_date"
    t.boolean "is_holiday_sun", default: false
    t.boolean "is_holiday_mon", default: false
    t.boolean "is_holiday_tue", default: false
    t.boolean "is_holiday_wed", default: false
    t.boolean "is_holiday_thu", default: false
    t.boolean "is_holiday_fri", default: false
    t.boolean "is_holiday_sat", default: false
    t.integer "delivery_time_type"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "delivery_datetime_temporary_holidays", force: :cascade do |t|
    t.integer "delivery_datetime_setting_id", null: false
    t.date "delivery_holiday"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "delivery_targets", force: :cascade do |t|
    t.integer "end_user_id"
    t.string "first_name"
    t.string "last_name"
    t.string "postal_code"
    t.string "state"
    t.string "city"
    t.string "town"
    t.string "line1"
    t.string "line2"
    t.string "phone_number"
    t.boolean "is_default"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email"
  end

  create_table "end_user_notifications", force: :cascade do |t|
    t.integer "end_user_id"
    t.string "title"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "url"
  end

  create_table "end_users", force: :cascade do |t|
    t.string "email"
    t.string "phone_number"
    t.string "password_digest"
    t.integer "authority_category", default: 0
    t.boolean "is_introduction_complete"
    t.string "verification_code"
    t.datetime "verification_code_expired_at"
    t.integer "email_authentication_status"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "first_name_kana"
    t.string "last_name_kana"
    t.string "stripe_customer_id"
    t.string "google_auth_id"
    t.string "google_auth_email"
    t.string "wait_for_update_email"
    t.string "email_reset_key"
    t.index ["email"], name: "index_end_users_on_email", unique: true
  end

  create_table "html_mail_templates", force: :cascade do |t|
    t.integer "account_id", null: false
    t.string "name", null: false
    t.string "mail_title", null: false
    t.text "content", null: false
    t.integer "template_type", default: 0, null: false
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "line_official_account_user_relations", force: :cascade do |t|
    t.string "public_id", null: false
    t.integer "line_official_account_id", null: false
    t.integer "line_user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "line_official_accounts", force: :cascade do |t|
    t.string "public_id", null: false
    t.integer "account_id", null: false
    t.string "name", null: false
    t.string "channel_id"
    t.string "channel_secret"
    t.string "channel_token"
    t.string "login_channel_id"
    t.string "login_channel_secret"
    t.string "login_channel_token"
    t.string "qr_code_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "line_users", force: :cascade do |t|
    t.integer "account_id", null: false
    t.string "public_id", null: false
    t.string "line_user_id"
    t.string "line_display_name"
    t.string "line_picture_url"
    t.integer "customer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "merchant_stripe_subscriptions", force: :cascade do |t|
    t.integer "end_user_id", null: false
    t.integer "monthly_payment_plan_id", null: false
    t.string "stripe_subscription_id", null: false
    t.datetime "canceled_at"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "merchant_users", force: :cascade do |t|
    t.integer "account_id"
    t.string "email"
    t.string "phone_number"
    t.string "password_digest"
    t.integer "authority_category", default: 0
    t.boolean "is_introduction_complete"
    t.string "verification_code"
    t.datetime "verification_code_expired_at"
    t.integer "email_authentication_status"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "google_auth_id"
    t.string "google_auth_email"
    t.string "first_name"
    t.string "last_name"
    t.string "first_name_kana"
    t.string "last_name_kana"
    t.string "wait_for_update_email"
    t.string "email_reset_key"
    t.boolean "is_root_user", default: false
    t.integer "allow_read_merchant_user", default: 0
    t.integer "allow_create_merchant_user", default: 0
    t.integer "allow_update_merchant_user", default: 0
    t.integer "allow_delete_merchant_user", default: 0
    t.integer "allow_update_merchant_user_permission", default: 0
    t.integer "allow_read_reserve_frame", default: 0
    t.integer "allow_create_reserve_frame", default: 0
    t.integer "allow_update_reserve_frame", default: 0
    t.integer "allow_delete_reserve_frame", default: 0
    t.integer "allow_read_reservation", default: 0
    t.integer "allow_create_reservation", default: 0
    t.integer "allow_confirm_reservation", default: 0
    t.integer "allow_cancel_reservation", default: 0
    t.integer "allow_read_ticket_master", default: 0
    t.integer "allow_create_ticket_master", default: 0
    t.integer "allow_update_ticket_master", default: 0
    t.integer "allow_delete_ticket_master", default: 0
    t.integer "allow_read_monthly_payment_plan", default: 0
    t.integer "allow_create_monthly_payment_plan", default: 0
    t.integer "allow_update_monthly_payment_plan", default: 0
    t.integer "allow_delete_monthly_payment_plan", default: 0
    t.integer "allow_read_resource", default: 0
    t.integer "allow_create_resource", default: 0
    t.integer "allow_update_resource", default: 0
    t.integer "allow_delete_resource", default: 0
    t.integer "allow_read_product", default: 0
    t.integer "allow_create_product", default: 0
    t.integer "allow_update_product", default: 0
    t.integer "allow_delete_product", default: 0
    t.integer "allow_update_delivery_datetime", default: 0
    t.integer "allow_update_product_shipping_status", default: 0
    t.integer "allow_read_customer", default: 0
    t.integer "allow_create_customer", default: 0
    t.integer "allow_update_customer", default: 0
    t.integer "allow_delete_customer", default: 0
    t.integer "allow_read_customer_group", default: 0
    t.integer "allow_create_customer_group", default: 0
    t.integer "allow_update_customer_group", default: 0
    t.integer "allow_delete_customer_group", default: 0
    t.integer "allow_read_webpage", default: 0
    t.integer "allow_create_webpage", default: 0
    t.integer "allow_update_webpage", default: 0
    t.integer "allow_delete_webpage", default: 0
    t.integer "allow_read_questionnaire_master", default: 0
    t.integer "allow_create_questionnaire_master", default: 0
    t.integer "allow_update_questionnaire_master", default: 0
    t.integer "allow_delete_questionnaire_master", default: 0
    t.integer "allow_read_questionnaire_answer", default: 0
    t.integer "allow_read_sales", default: 0
    t.integer "allow_read_payment_request", default: 0
    t.integer "allow_create_payment_request", default: 0
    t.integer "allow_read_credit_card", default: 0
    t.integer "allow_update_credit_card", default: 0
    t.integer "allow_read_stripe_business_info", default: 0
    t.integer "allow_update_stripe_business_info", default: 0
    t.integer "allow_read_system_plan_subscription_payments", default: 0
    t.integer "allow_update_shared_component", default: 0
    t.integer "allow_update_system_plan", default: 0
    t.integer "allow_read_message_template", default: 0
    t.integer "allow_create_message_template", default: 0
    t.integer "allow_update_message_template", default: 0
    t.integer "allow_delete_message_template", default: 0
    t.integer "allow_read_line_official_account", default: 0
    t.integer "allow_update_line_official_account", default: 0
    t.integer "allow_read_line_user", default: 0
    t.integer "allow_connect_line_user", default: 0
    t.integer "allow_send_mail", default: 0
    t.integer "allow_send_line_message", default: 0
    t.integer "allow_read_html_mail_template", default: 0
    t.integer "allow_create_html_mail_template", default: 0
    t.integer "allow_update_html_mail_template", default: 0
    t.integer "allow_delete_html_mail_template", default: 0
    t.integer "read_dashboard", default: 0
    t.integer "read_questionnaire_answers_status", default: 0
    t.integer "read_reservations_status", default: 0
    t.integer "read_orders_status", default: 0
    t.integer "read_account_notifications_status", default: 0
    t.integer "read_business_notifications_status", default: 0
    t.index ["email"], name: "index_merchant_users_on_email", unique: true
  end

  create_table "message_templates", force: :cascade do |t|
    t.integer "account_id", null: false
    t.string "name", null: false
    t.string "title", null: false
    t.text "content", null: false
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "monthly_payment_plans", force: :cascade do |t|
    t.string "name"
    t.integer "price", null: false
    t.boolean "reserve_is_unlimited", default: true
    t.integer "reserve_interval_number"
    t.integer "reserve_interval_unit"
    t.integer "enable_reserve_count"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "account_id"
    t.text "description"
    t.string "stripe_plan_id"
    t.integer "publish_status", default: 0
    t.datetime "deleted_at"
    t.integer "image1_account_s3_image_id"
  end

  create_table "order_items", force: :cascade do |t|
    t.integer "order_id", null: false
    t.integer "account_id", null: false
    t.integer "item_type", null: false
    t.integer "ticket_master_id"
    t.integer "monthly_payment_plan_id"
    t.string "product_name", null: false
    t.integer "price", null: false
    t.integer "commission", null: false
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "product_id"
    t.integer "reservation_id"
    t.integer "quantity"
    t.integer "product_type_id"
    t.boolean "shipped", default: false
    t.integer "delivery_charge"
    t.string "delivery_date_text"
  end

  create_table "orders", force: :cascade do |t|
    t.integer "end_user_id"
    t.integer "customer_id"
    t.integer "cart_id"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "address"
    t.string "postal_code"
    t.boolean "mailed"
    t.integer "delivery_charge"
  end

  create_table "out_of_range_frames", force: :cascade do |t|
    t.integer "reserve_frame_id"
    t.datetime "start_at"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "product_types", force: :cascade do |t|
    t.integer "product_id"
    t.string "name"
    t.integer "inventory"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "inventory_allocation", default: 0
  end

  create_table "products", force: :cascade do |t|
    t.integer "account_id"
    t.string "name"
    t.integer "price"
    t.integer "tax_rate"
    t.integer "inventory"
    t.text "description"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "publish_status", default: 0
    t.datetime "deleted_at"
    t.integer "delivery_charge_type"
    t.integer "flat_rate_delivery_charge"
    t.integer "delivery_charge_with_order_number", default: 0
    t.boolean "delivery_datetime_target_flg", default: true
    t.integer "inventory_allocation", default: 0
    t.integer "image1_account_s3_image_id"
  end

  create_table "purchased_tickets", force: :cascade do |t|
    t.integer "end_user_id"
    t.integer "ticket_master_id"
    t.integer "remain_number"
    t.datetime "expired_at"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "questionnaire_answers", force: :cascade do |t|
    t.integer "questionnaire_master_id"
    t.integer "customer_id"
    t.string "title"
    t.text "answers_json"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "questionnaire_masters", force: :cascade do |t|
    t.integer "account_id"
    t.string "title"
    t.string "description"
    t.text "question_form_json"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "publish_status", default: 0
    t.datetime "deleted_at"
  end

  create_table "reservation_credit_card_payment_prices", force: :cascade do |t|
    t.integer "reservation_id", null: false
    t.string "name", null: false
    t.integer "price", null: false
    t.integer "reserve_number_of_people", null: false
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reservation_local_payment_prices", force: :cascade do |t|
    t.integer "reservation_id", null: false
    t.string "name", null: false
    t.integer "price", null: false
    t.integer "reserve_number_of_people", null: false
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reservations", force: :cascade do |t|
    t.integer "reserve_frame_id", null: false
    t.datetime "start_at", null: false
    t.datetime "end_at"
    t.integer "number_of_people", default: 1, null: false
    t.integer "end_user_id"
    t.integer "customer_id"
    t.integer "status", default: 0
    t.integer "payment_method", default: 0
    t.integer "price"
    t.string "representative_first_name"
    t.string "representative_last_name"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "ticket_master_id"
    t.integer "monthly_payment_plan_id"
    t.string "stripe_payment_intent_id"
    t.integer "ticket_consume_number"
  end

  create_table "reserve_frame_credit_card_payment_prices", force: :cascade do |t|
    t.integer "reserve_frame_id", null: false
    t.string "name", null: false
    t.integer "price", null: false
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reserve_frame_local_payment_prices", force: :cascade do |t|
    t.integer "reserve_frame_id", null: false
    t.string "name", null: false
    t.integer "price", null: false
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reserve_frame_monthly_payment_plans", force: :cascade do |t|
    t.integer "reserve_frame_id"
    t.integer "monthly_payment_plan_id"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reserve_frame_reception_times", force: :cascade do |t|
    t.integer "reserve_frame_id"
    t.time "reception_start_time", null: false
    t.time "reception_end_time"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reserve_frame_resources", force: :cascade do |t|
    t.integer "reserve_frame_id"
    t.integer "resource_id"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reserve_frame_ticket_masters", force: :cascade do |t|
    t.integer "reserve_frame_id"
    t.integer "ticket_master_id"
    t.integer "consume_number"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reserve_frames", force: :cascade do |t|
    t.integer "account_id", null: false
    t.datetime "start_at", null: false
    t.string "title", null: false
    t.text "description"
    t.boolean "is_repeat", null: false
    t.integer "repeat_interval_type"
    t.integer "repeat_interval_number_day"
    t.integer "repeat_interval_number_week"
    t.integer "repeat_interval_number_month"
    t.integer "repeat_interval_month_date"
    t.datetime "repeat_end_date"
    t.integer "capacity", default: 1, null: false
    t.integer "local_payment_price"
    t.integer "publish_status", default: 0
    t.integer "reception_type", default: 0
    t.integer "reception_start_day_before"
    t.integer "reception_deadline", default: 0
    t.integer "reception_deadline_hour_before"
    t.integer "reception_deadline_day_before"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_local_payment_enable"
    t.boolean "is_ticket_payment_enable"
    t.boolean "is_monthly_plan_payment_enable"
    t.integer "credit_card_payment_price"
    t.boolean "is_credit_card_payment_enable"
    t.boolean "is_every_day_repeat", default: true
    t.boolean "is_every_week_repeat", default: true
    t.boolean "is_every_month_repeat", default: true
    t.string "reception_phone_number"
    t.boolean "is_set_price"
    t.boolean "is_repeat_sun", default: false
    t.boolean "is_repeat_mon", default: false
    t.boolean "is_repeat_tue", default: false
    t.boolean "is_repeat_wed", default: false
    t.boolean "is_repeat_thu", default: false
    t.boolean "is_repeat_fri", default: false
    t.boolean "is_repeat_sat", default: false
    t.datetime "deleted_at"
    t.integer "questionnaire_master_id"
    t.boolean "is_accept_cancel", default: false
    t.boolean "is_accept_cancel_on_the_day", default: false
    t.integer "cancel_reception_day_before"
    t.integer "cancel_reception_hour_before"
    t.integer "lottery_confirmed_day_before", default: 1
    t.integer "image1_account_s3_image_id"
  end

  create_table "resources", force: :cascade do |t|
    t.integer "account_id", null: false
    t.string "name", null: false
    t.integer "quantity", null: false
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "resouce_type", default: 99
    t.integer "image1_account_s3_image_id"
    t.integer "is_show_frontend", default: 0
    t.string "description"
  end

  create_table "send_line_histories", force: :cascade do |t|
    t.string "public_id", null: false
    t.integer "account_id", null: false
    t.integer "line_user_id", null: false
    t.integer "line_official_account_id", null: false
    t.string "message", null: false
    t.string "merchant_user_id"
    t.integer "send_status", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "send_line_schedules", force: :cascade do |t|
    t.string "public_id", null: false
    t.integer "account_id", null: false
    t.integer "merchant_user_id"
    t.integer "line_user_id", null: false
    t.integer "line_official_account_id", null: false
    t.string "message", null: false
    t.datetime "scheduled_datetime", null: false
    t.integer "send_status", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "send_mail_histories", force: :cascade do |t|
    t.integer "account_id", null: false
    t.integer "customer_id"
    t.integer "message_type", default: 0, null: false
    t.integer "html_template_type", default: 0
    t.string "email", null: false
    t.string "mail_title", null: false
    t.text "message_body", null: false
    t.integer "merchant_user_id"
    t.integer "stripe_payment_request_id"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "send_mail_schedules", force: :cascade do |t|
    t.integer "account_id", null: false
    t.integer "merchant_user_id"
    t.integer "customer_id"
    t.string "email", null: false
    t.string "mail_title", null: false
    t.text "message_body", null: false
    t.integer "message_template_type", default: 0, null: false
    t.integer "html_template_type", default: 0
    t.datetime "scheduled_datetime", null: false
    t.string "public_id", null: false
    t.integer "send_status", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shared_components", force: :cascade do |t|
    t.integer "account_id"
    t.string "navbar_brand_text", default: "SquareEight"
    t.string "navbar_brand_type", default: "text"
    t.string "navbar_brand_image_s3_object_public_url"
    t.string "nabvar_brand_image_s3_object_name"
    t.string "nabvar_brand_image_height"
    t.string "nabvar_brand_image_width"
    t.string "navbar_brand_background_color", default: "light"
    t.string "navbar_brand_variant_color", default: "light"
    t.string "footer_copyright_text", default: "SquareEight"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shipping_fee_per_regions", force: :cascade do |t|
    t.integer "product_id", null: false
    t.integer "shipping_fee", null: false
    t.string "region", null: false
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shop_monthly_payment_plans", force: :cascade do |t|
    t.string "public_id", null: false
    t.integer "shop_id", null: false
    t.integer "monthly_payment_plan_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shop_products", force: :cascade do |t|
    t.string "public_id", null: false
    t.integer "shop_id", null: false
    t.integer "product_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shop_reserve_frames", force: :cascade do |t|
    t.string "public_id", null: false
    t.integer "shop_id", null: false
    t.integer "reserve_frame_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shop_ticket_masters", force: :cascade do |t|
    t.string "public_id", null: false
    t.integer "shop_id", null: false
    t.integer "ticket_master_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shop_webpages", force: :cascade do |t|
    t.string "public_id", null: false
    t.integer "shop_id", null: false
    t.integer "webpage_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shops", force: :cascade do |t|
    t.string "public_id", null: false
    t.integer "account_id", null: false
    t.string "name", null: false
    t.string "description1", null: false
    t.string "description2"
    t.string "postal_code"
    t.string "state"
    t.string "city"
    t.string "town"
    t.string "line1"
    t.string "line2"
    t.string "access_info"
    t.integer "parking_lot_display_status", default: 0
    t.string "remarks"
    t.integer "shop_image1_account_s3_image_id"
    t.integer "shop_image2_account_s3_image_id"
    t.integer "shop_image3_account_s3_image_id"
    t.integer "shop_image4_account_s3_image_id"
    t.integer "shop_image5_account_s3_image_id"
    t.integer "shop_image6_account_s3_image_id"
    t.boolean "is_review_reception", default: false
    t.integer "business_type", default: 99
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stripe_payment_intents", force: :cascade do |t|
    t.integer "amount", null: false
    t.string "currency", default: "jpy"
    t.string "stripe_payment_intent_id", null: false
    t.string "stripe_payment_method_id"
    t.string "stripe_customer_id", null: false
    t.string "transfer_destination_account_id"
    t.integer "application_fee_amount", default: 0
    t.string "purchase_product_name"
    t.string "order_date"
    t.integer "product_id"
    t.integer "ticket_master_id"
    t.integer "reserve_frame_id"
    t.integer "monthly_payment_plan_id"
    t.integer "system_product_type"
    t.integer "end_user_id"
    t.integer "account_id"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "system_plan_name"
    t.integer "payment_request_id"
  end

  create_table "stripe_payment_requests", force: :cascade do |t|
    t.integer "account_id", null: false
    t.integer "customer_id"
    t.integer "end_user_id"
    t.integer "price", null: false
    t.integer "status", default: 0
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.integer "send_method", default: 0
    t.integer "line_user_id"
  end

  create_table "stripe_people", force: :cascade do |t|
    t.integer "account_id", null: false
    t.string "stripe_person_id", null: false
    t.string "last_name"
    t.string "first_name"
    t.boolean "is_representative", default: false
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "system_account_notifications", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "system_admin_users", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "phone_number"
    t.string "password_digest"
    t.integer "authority_category", default: 0
    t.boolean "is_introduction_complete"
    t.string "verification_code"
    t.datetime "verification_code_expired_at"
    t.integer "authentication_status"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_system_admin_users_on_email", unique: true
  end

  create_table "system_end_user_notifications", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "system_stripe_subscriptions", force: :cascade do |t|
    t.integer "account_id", null: false
    t.integer "service_plan", null: false
    t.string "stripe_subscription_id", null: false
    t.datetime "canceled_at"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ticket_masters", force: :cascade do |t|
    t.string "name"
    t.integer "account_id"
    t.integer "issue_number"
    t.integer "price"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.boolean "is_expired"
    t.integer "effective_month"
    t.integer "publish_status", default: 0
    t.datetime "deleted_at"
    t.integer "image1_account_s3_image_id"
  end

  create_table "unreservable_frames", force: :cascade do |t|
    t.integer "reserve_frame_id"
    t.datetime "start_at"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "webpage_blocks", force: :cascade do |t|
    t.integer "webpage_id", null: false
    t.text "content_json", null: false
    t.integer "block_type"
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "webpages", force: :cascade do |t|
    t.integer "account_id", null: false
    t.string "tag", null: false
    t.string "public_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "publish_status", default: 0
  end

end
