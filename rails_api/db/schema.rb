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

ActiveRecord::Schema[7.0].define(version: 2022_07_03_105317) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string "business_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "stripe_customer_id"
    t.string "stripe_account_id"
    t.string "selected_external_account_id"
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

  create_table "merchant_users", force: :cascade do |t|
    t.integer "account_id"
    t.string "email", null: false
    t.string "name"
    t.string "password_digest"
    t.integer "authority_category", default: 0
    t.boolean "is_introduction_complete"
    t.string "verification_code"
    t.datetime "verification_code_expired_at"
    t.integer "authentication_status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
  end

  create_table "reserve_frames", force: :cascade do |t|
    t.datetime "start_at", null: false
    t.datetime "end_at"
    t.string "title", null: false
    t.text "description"
    t.boolean "is_repeat"
    t.integer "repeat_interval"
    t.integer "capacity", default: 1, null: false
    t.integer "local_payment_price"
    t.integer "publish_status", default: 0
    t.integer "reception_type", default: 0
    t.integer "reception_start_day_before"
    t.integer "cancel_reception", default: 0
    t.integer "cancel_reseption_day_before"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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

  create_table "ticket_masters", force: :cascade do |t|
    t.string "name"
    t.integer "account_id"
    t.integer "issue_number"
    t.integer "price"
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
