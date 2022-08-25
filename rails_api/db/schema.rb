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

ActiveRecord::Schema[7.0].define(version: 2022_08_25_031543) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string "business_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "stripe_customer_id"
    t.string "stripe_account_id"
    t.string "selected_external_account_id"
    t.string "stripe_representative_person_id"
  end

  create_table "business_hours", force: :cascade do |t|
    t.integer "account_id", null: false
    t.time "mon_start"
    t.time "mon_end"
    t.time "tue_start"
    t.time "tue_end"
    t.time "wed_start"
    t.time "wed_end"
    t.time "thu_start"
    t.time "thu_end"
    t.time "fri_start"
    t.time "fri_end"
    t.time "sat_start"
    t.time "sat_end"
    t.time "sun_start"
    t.time "sun_end"
    t.time "holiday_start"
    t.time "holiday_end"
    t.time "mon_break_start"
    t.time "mon_break_end"
    t.time "tue_break_start"
    t.time "tue_break_end"
    t.time "wed_break_start"
    t.time "wed_break_end"
    t.time "thu_break_start"
    t.time "thu_break_end"
    t.time "fri_break_start"
    t.time "fri_break_end"
    t.time "sat_break_start"
    t.time "sat_break_end"
    t.time "sun_break_start"
    t.time "sun_break_end"
    t.time "holiday_break_start"
    t.time "holiday_break_end"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cart_monthly_payment_plans", force: :cascade do |t|
    t.integer "account_id"
    t.integer "end_user_id"
    t.integer "monthly_payment_plan_id"
    t.integer "quantity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cart_products", force: :cascade do |t|
    t.integer "account_id"
    t.integer "end_user_id"
    t.integer "product_id"
    t.integer "quantity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cart_ticket_masters", force: :cascade do |t|
    t.integer "account_id"
    t.integer "end_user_id"
    t.integer "ticket_master_id"
    t.integer "quantity"
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
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "account_id", null: false
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
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
    t.index ["email"], name: "index_end_users_on_email", unique: true
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
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "google_auth_id"
    t.string "google_auth_email"
    t.string "first_name"
    t.string "last_name"
    t.string "first_name_kana"
    t.string "last_name_kana"
    t.string "wait_for_update_email"
    t.index ["email"], name: "index_merchant_users_on_email", unique: true
  end

  create_table "monthly_payment_plans", force: :cascade do |t|
    t.string "name"
    t.integer "price", null: false
    t.boolean "reserve_is_unlimited", default: true
    t.integer "reserve_interval_number"
    t.integer "reserve_interval_unit"
    t.integer "enable_reserve_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "account_id"
    t.text "description"
    t.string "s3_object_public_url"
    t.string "s3_object_name"
    t.string "stripe_plan_id"
  end

  create_table "order_items", force: :cascade do |t|
    t.integer "order_id", null: false
    t.integer "account_id", null: false
    t.integer "product_type", null: false
    t.integer "ticket_master_id"
    t.integer "monthly_payment_plan_id"
    t.string "product_name", null: false
    t.integer "price", null: false
    t.integer "commission", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "product_id"
    t.integer "reservation_id"
  end

  create_table "orders", force: :cascade do |t|
    t.integer "end_user_id"
    t.integer "customer_id"
    t.integer "cart_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "address"
    t.string "postal_code"
    t.boolean "mailed"
  end

  create_table "product_types", force: :cascade do |t|
    t.integer "product_id"
    t.string "name"
    t.integer "inventory"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "products", force: :cascade do |t|
    t.integer "account_id"
    t.string "name"
    t.integer "price"
    t.integer "tax_rate"
    t.integer "inventory"
    t.text "description"
    t.string "s3_object_public_url"
    t.string "s3_object_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "purchased_tickets", force: :cascade do |t|
    t.integer "end_user_id"
    t.integer "ticket_master_id"
    t.integer "remain_number"
    t.datetime "expired_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "questionnaire_master_form_options", force: :cascade do |t|
    t.integer "questionnaire_master_form_id"
    t.string "answer"
    t.text "textform_answer"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "questionnaire_master_forms", force: :cascade do |t|
    t.integer "questionnaire_master_id"
    t.string "question"
    t.integer "form_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "questionnaire_masters", force: :cascade do |t|
    t.integer "account_id"
    t.string "title"
    t.text "description"
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
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "ticket_master_id"
    t.integer "monthly_payment_plan_id"
    t.string "stripe_payment_intent_id"
    t.integer "ticket_consume_number"
  end

  create_table "reserve_frame_monthly_payment_plans", force: :cascade do |t|
    t.integer "reserve_frame_id"
    t.integer "monthly_payment_plan_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reserve_frame_reception_times", force: :cascade do |t|
    t.integer "reserve_frame_id"
    t.time "reception_start_time", null: false
    t.time "reception_end_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reserve_frame_resorces", force: :cascade do |t|
    t.integer "reserve_frame_id"
    t.integer "resource_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reserve_frame_ticket_masters", force: :cascade do |t|
    t.integer "reserve_frame_id"
    t.integer "ticket_master_id"
    t.integer "consume_number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reserve_frames", force: :cascade do |t|
    t.integer "account_id", null: false
    t.datetime "start_at", null: false
    t.string "title", null: false
    t.text "description"
    t.boolean "is_repeat"
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
    t.integer "cancel_reception", default: 0
    t.integer "cancel_reception_hour_before"
    t.integer "cancel_reception_day_before"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_local_payment_enable"
    t.boolean "is_ticket_payment_enable"
    t.boolean "is_monthly_plan_payment_enable"
    t.integer "credit_card_payment_price"
    t.boolean "is_credit_card_payment_enable"
    t.string "s3_object_public_url"
    t.string "s3_object_name"
    t.boolean "is_every_day_repeat", default: true
    t.boolean "is_every_week_repeat", default: true
    t.boolean "is_every_month_repeat", default: true
    t.string "reception_phone_number"
  end

  create_table "resources", force: :cascade do |t|
    t.integer "account_id", null: false
    t.string "name", null: false
    t.integer "quantity", null: false
    t.integer "reception_time_setting"
    t.time "mon_start"
    t.time "mon_end"
    t.time "tue_start"
    t.time "tue_end"
    t.time "wed_start"
    t.time "wed_end"
    t.time "thu_start"
    t.time "thu_end"
    t.time "fri_start"
    t.time "fri_end"
    t.time "sat_start"
    t.time "sat_end"
    t.time "sun_start"
    t.time "sun_end"
    t.time "holiday_start"
    t.time "holiday_end"
    t.time "mon_break_start"
    t.time "mon_break_end"
    t.time "tue_break_start"
    t.time "tue_break_end"
    t.time "wed_break_start"
    t.time "wed_break_end"
    t.time "thu_break_start"
    t.time "thu_break_end"
    t.time "fri_break_start"
    t.time "fri_break_end"
    t.time "sat_break_start"
    t.time "sat_break_end"
    t.time "sun_break_start"
    t.time "sun_break_end"
    t.time "holiday_break_start"
    t.time "holiday_break_end"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "system_account_notifications", force: :cascade do |t|
    t.string "title"
    t.text "content"
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
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_system_admin_users_on_email", unique: true
  end

  create_table "system_end_user_notifications", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ticket_masters", force: :cascade do |t|
    t.string "name"
    t.integer "account_id"
    t.integer "issue_number"
    t.integer "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "s3_object_public_url"
    t.text "description"
    t.string "s3_object_name"
    t.boolean "is_expired"
    t.integer "effective_month"
  end

  create_table "unreservable_frames", force: :cascade do |t|
    t.integer "reserve_frame_id"
    t.datetime "start_at"
    t.datetime "end_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "webpage_blocks", force: :cascade do |t|
    t.integer "webpage_id", null: false
    t.text "content_json", null: false
    t.integer "block_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "webpages", force: :cascade do |t|
    t.integer "website_id", null: false
    t.string "tag", null: false, comment: "タグ"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_top_page", default: false
  end

  create_table "websites", force: :cascade do |t|
    t.integer "account_id", null: false
    t.string "tag", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "publish_status", default: 0
    t.text "default_footer_content"
    t.text "default_header_content"
  end

end
