class Account < ApplicationRecord
  include PublicIdModule

  before_create { |a| a.trial_end_datetime = (Time.zone.now + 7.days).end_of_day }

  enum service_plan: { Free: 0, Light: 1, Standard: 2, Premium: 3 }

  has_one :delivery_datetime_setting
  has_one :shared_component
  has_many :merchant_users, dependent: :destroy
  has_many :webpages
  has_many :payment_methods
  has_many :products
  has_many :ticket_masters
  has_many :monthly_payment_plans
  has_many :resources
  has_many :reserve_frames
  has_many :reservations, through: :reserve_frames
  has_many :orders
  has_many :order_items
  has_many :customers
  has_many :customer_groups
  has_many :questionnaire_masters
  has_many :questionnaire_answers, through: :customers
  has_many :message_templates
  has_many :html_mail_templates
  has_many :account_notifications
  has_many :stripe_payment_intents
  has_many :delivery_datetime_settings
  has_many :stripe_persons
  has_many :account_s3_images
  has_many :stripe_payment_requests
  has_many :line_official_accounts
  has_many :line_users, through: :line_official_accounts
  has_many :send_mail_histories
  has_many :send_mail_schedules
  has_many :send_line_histories
  has_many :send_line_schedules
  has_many :shops

  # プランごとの設定
  PLAN_NAME =  { "Free" => "フリープラン", "Light" => "ライトプラン", "Standard" => "スタンダードプラン", "Premium" => "プレミアムプラン" }
  RESERVATION_LIMIT = { "Free" => 10, "Light" => 500, "Standard" => 2000, "Premium" => 10000 }
  # SEND_MAIL_LIMIT = { "Free" => 50, "Light" => 500, "Standard" => 1000, "Premium" => 10000 }
  STRIPE_CHARGE_FEE = { "Free" => 80, "Light" => 70, "Standard" => 70, "Premium" => 50 }
  CUSTOMER_DISPLAY_LIMIT = { "Free" => 10, "Light" => 200, "Standard" => 500, "Premium" => nil }
  PLAN_PRICE = { "Free" => 0, "Light" => 1480, "Standard" => 2980, "Premium" => 6980 }
  STRIPE_APPLICATION_FEE_AMOUNT = { "Free" => 0.08, "Light" => 0.05, "Standard" => 0.05, "Premium" => 0.04 }
  STRIPE_APPLICATION_FEE_PERCENT = { "Free" => 8, "Light" => 5, "Standard" => 5, "Premium" => 4 }

  # キャンペーン
  # 無制限キャンペーン
  UNLIMITED_CAMPAIGN_END_AT = Time.new(2023, 2, 28)

  scope :enabled, -> { where(deleted_at: nil) }

  def reservation_limit
    # return 1000000000 if Time.zone.now < Account::UNLIMITED_CAMPAIGN_END_AT.end_of_day
    Account::RESERVATION_LIMIT[self.service_plan]
  end

  # 現状メールは制限なし
  # def send_mail_limit
  #   Account::SEND_MAIL_LIMIT[self.service_plan]
  # end

  def customers_with_limit
    # return 1000000000 if Time.zone.now < Account::UNLIMITED_CAMPAIGN_END_AT.end_of_day
    customers.limit(Account::CUSTOMER_DISPLAY_LIMIT[self.service_plan])
  end

  def plan_price
    Account::PLAN_PRICE[self.service_plan]
  end

  def plan_name
    Account::PLAN_NAME[self.service_plan]
  end

  def application_fee_amount
    Account::STRIPE_APPLICATION_FEE_AMOUNT[self.service_plan]
  end

  def application_fee_percent
    Account::STRIPE_APPLICATION_FEE_PERCENT[self.service_plan]
  end

  def service_plan_stripe_id
    case self.service_plan
    when "Light" then
      return ENV["STRIPE_SYSTEM_LIGHT_PLAN_ID"]
    when "Standard" then
      return ENV["STRIPE_SYSTEM_STANDARD_PLAN_ID"]
    when "Premium" then
      return ENV["STRIPE_SYSTEM_PREMIUM_PLAN_ID"]
    else
      raise
    end
  end

  def stripe_serivice_plan_subscription_metadata
    {
      'account_id': self.id,
      'system_plan_name': self.plan_name,
      'price': self.plan_price,
      'product_type': 'system_plan'
    }
  end

  def page_links
    result = []
    self.webpages.each do |w|
      result.push({ text: w.tag, value: '/webpages/' + w.public_id, label: 'Webページ', publish_status: w.publish_status })
    end
    self.reserve_frames.enabled.each do |r|
      result.push({ text: r.title, value: '/reserve_frame/' + r.public_id + '/calendar', label: '予約ページ', publish_status: r.publish_status })
    end
    self.products.enabled.each do |p|
      result.push({ text: p.name, value: '/product/' + p.public_id + '/purchase', label: '物販商品購入ページ', publish_status: p.publish_status  })
    end
    self.ticket_masters.enabled.each do |t|
      result.push({ text: t.name, value: '/ticket/' + t.public_id + '/purchase/', label: 'チケット購入ページ', publish_status: t.publish_status })
    end
    self.monthly_payment_plans.enabled.each do |m|
      result.push({ text: m.name, value: '/monthly_payment/' + m.public_id + '/purchase/', label: '月額サブスクリプション加入ページ', publish_status: m.publish_status })
    end
    self.questionnaire_masters.enabled.each do |q|
      result.push({ text: q.title, value: '/questionnaire/' + q.public_id, label: 'アンケート', publish_status: q.publish_status })
    end
    result
  end

  def payment_methods
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
    if self.stripe_customer_id.present?
      customer = Stripe::Customer.retrieve(self.stripe_customer_id)
      default_payment_method_id = customer["invoice_settings"]["default_payment_method"]
      payment_methods = Stripe::Customer.list_payment_methods(
        self.stripe_customer_id,
        {type: 'card'},
      )
      payment_methods = payment_methods["data"].map{ |data| JSON.parse(data.to_json) }
    else
      payment_methods = []
      default_payment_method_id = nil
    end
    return default_payment_method_id, payment_methods
  end

  def search_stripe_payment_intents
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
    query = 'metadata["account_id"]:' + "\'" + self.id.to_s + "\'"
    result = Stripe::PaymentIntent.search({query: query, limit: 100})
    JSON.parse(result.to_json)["data"]
  end

  def answer_contents
    result = []
    questionnaire_answers.order(created_at: :desc).each do |questionnaire_answer|
      result.push({answer: questionnaire_answer.parse_answer_json,
                   customer_name: questionnaire_answer.customer.full_name,
                   answer_datetime: questionnaire_answer.created_at.strftime("%Y年%m月%d日 %H時%M分")})
    end
    result
  end

  def system_plan_subscription_payments
    stripe_payment_intents.where(system_product_type: "SystemPlan")
  end

  def stripe_account_names
    return [] if stripe_persons.blank?
    stripe_persons.map{|person| person.last_name + person.first_name}
  end

  def merchant_user_emails
    merchant_users.pluck(:email)
  end
end
