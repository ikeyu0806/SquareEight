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
  has_many :system_stripe_subscriptions
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
  PLAN_NAME =  { "Free" => "フリープラン", "Light" => "ライトプラン", "Standard" => "スタンダードプラン", "Premium" => "プレミアムプラン", "Trial" => 1000000000 }
  RESERVATION_LIMIT = { "Free" => 500, "Light" => 1000, "Standard" => 3000, "Premium" => 1000000000, "Trial" => 1000000000 }
  RESOURCE_REGISTER_LIMIT = { "Free" => 1000000000, "Light" => 1000000000, "Standard" => 1000000000, "Premium" => 1000000000, "Trial" => 1000000000 }
  SEND_MAIL_LIMIT = { "Free" => 100, "Light" => 1000, "Standard" => 5000, "Premium" => 1000000000, "Trial" => 1000000000 }
  STRIPE_CHARGE_FEE = { "Free" => 80, "Light" => 70, "Standard" => 70, "Premium" => 50, "Trial" => 1000000000 }
  CUSTOMER_DISPLAY_LIMIT = { "Free" => 100, "Light" => 300, "Standard" => 1000, "Premium" => 1000000000, "Trial" => 1000000000 }
  QUESTIONNAIRE_MASTER_LIMIT = { "Free" => 1000000000, "Light" => 1000000000, "Standard" => 1000000000, "Premium" => 1000000000, "Trial" => 1000000000 }
  PLAN_PRICE = { "Free" => 0, "Light" => 1480, "Standard" => 2980, "Premium" => 6980, "Trial" => 0 }
  STRIPE_APPLICATION_FEE_AMOUNT = { "Free" => 0.08, "Light" => 0.07, "Standard" => 0.07, "Premium" => 0.07, "Trial" => 0.07 }
  STRIPE_APPLICATION_FEE_PERCENT = { "Free" => 8, "Light" => 7, "Standard" => 7, "Premium" => 7, "Trial" => 7 }

  # キャンペーン
  # 無制限キャンペーン
  UNLIMITED_CAMPAIGN_END_AT = Time.new(2023, 2, 28)

  scope :enabled, -> { where(deleted_at: nil) }

  def reservation_limit
    # return 1000000000 if Time.zone.now < Account::UNLIMITED_CAMPAIGN_END_AT.end_of_day
    Account::RESERVATION_LIMIT[self.service_plan_status]
  end

  def resource_limit
    Account::RESOURCE_REGISTER_LIMIT[self.service_plan_status]
  end

  def questionnaire_master_limit
    Account::QUESTIONNAIRE_MASTER_LIMIT[self.service_plan_status]
  end

  def send_mail_limit
    Account::SEND_MAIL_LIMIT[self.service_plan_status]
  end

  def customers_with_limit
    # return 1000000000 if Time.zone.now < Account::UNLIMITED_CAMPAIGN_END_AT.end_of_day
    customers.limit(Account::CUSTOMER_DISPLAY_LIMIT[self.service_plan_status])
  end

  def plan_price
    Account::PLAN_PRICE[self.service_plan_status]
  end

  def plan_name
    Account::PLAN_NAME[self.service_plan_status]
  end

  def application_fee_amount
    Account::STRIPE_APPLICATION_FEE_AMOUNT[self.service_plan_status]
  end

  def application_fee_percent
    Account::STRIPE_APPLICATION_FEE_PERCENT[self.service_plan_status]
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
    self.shops.each do |s|
      result.push({ text: s.name, value: '/shop/' + s.public_id, label: '店舗ページ', publish_status: s.publish_status })
    end
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

  def answer_contents(current_page, display_count)
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

  def system_plan_subscription_payments_page_contents
    JSON.parse(system_plan_subscription_payments.order(id: :desc).to_json(methods: [
      :system_stripe_subscription_join_datetext
    ]))
  end

  def stripe_account_names
    return [] if stripe_persons.blank?
    stripe_persons.map{|person| person.last_name + person.first_name}
  end

  def merchant_user_emails
    merchant_users.pluck(:email)
  end

  def service_plan_status
    return 'Trial' if ((Time.zone.now < self.trial_end_datetime) && (self.service_plan.eql?('Free')))
    return service_plan
  end

  def registered_customers_count
    customers.count
  end

  def create_first_notification
    self.account_notifications.create!(title: "SquareEightへの要望・ご意見受け付けております", url: "/inquiry")
    self.account_notifications.create!(title: "まずは店舗情報を登録してください。", url: "/admin/shop/new")
    self.account_notifications.create!(title: "ナビゲーションバーの「プラン変更」からプランを変更できます。", url: "/admin/plan/choice")
    self.account_notifications.create!(title: "事業所情報と振込先口座を登録してオンライン決済機能を有効化してください。", url: "/admin/sales_transfer")
    self.account_notifications.create!(title: "SquareEightで作成したページのヘッダーにお店の名前を設定できます。", url: "/admin/shared_component/edit")
  end

  def answer_contents_with_customer(customer_id)
    result = []
    questionnaire_answers.where(customer_id: customer_id).order(:id).each do |questionnaire_answer|
      result.push({answer: questionnaire_answer.parse_answer_json,
                   customer_name: questionnaire_answer.customer.full_name,
                   answer_datetime: questionnaire_answer.created_at.strftime("%Y年%m月%d日 %H時%M分")})
    end
    result
  end

  def cancel_system_subscription
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
    stripe_customer = Stripe::Customer.retrieve(stripe_customer_id)
    default_payment_method_id = stripe_customer["invoice_settings"]["default_payment_method"]
    system_stripe_subscriptions.where(canceled_at: nil).each do |subscription|
      subscription.update!(
        canceled_at: Time.zone.now
      )
      amount = subscription.prorated_plan_price(self.plan_price)
      if subscription.service_plan != "Free" && amount > 50
        # 日割りで請求
        payment_intent = Stripe::PaymentIntent.create({
          amount: amount,
          currency: 'jpy',
          payment_method_types: ['card'],
          payment_method: default_payment_method_id,
          customer: self.stripe_customer_id,
          metadata: subscription.stripe_serivice_plan_subscription_metadata
        })
        Stripe::PaymentIntent.confirm(
          payment_intent.id
        )
        subscription.update!(last_paid_at: Time.zone.now)
      end
    end
    self.update!(service_plan: "Free")
  end
end
