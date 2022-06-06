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

ActiveRecord::Schema[7.0].define(version: 2022_06_03_022017) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string "business_name", comment: "名前"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "merchant_users", force: :cascade do |t|
    t.integer "account_id", comment: "アカウントID"
    t.string "email", null: false, comment: "Email"
    t.string "name", comment: "名前"
    t.string "name_kana", comment: "名前カナ"
    t.string "password_digest", comment: "ハッシュ化パスワード"
    t.integer "authority_category", default: 0, comment: "権限区分"
    t.boolean "is_introduction_complete", comment: "イントロダクション終了状況"
    t.string "verification_code", comment: "検証コード"
    t.datetime "verification_code_expired_at", comment: "検証コード期限切れ日時"
    t.integer "authentication_status", comment: "認証ステータスのenum"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_merchant_users_on_email", unique: true
  end

end
