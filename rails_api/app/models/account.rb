class Account < ApplicationRecord
  enum service_plan: { Free: 0, Light: 1, Standard: 2, Premium: 3 }

  has_one :business_hour
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
  has_many :customers
  has_many :questionnaire_masters
  has_many :questionnaire_answers, through: :customers
  has_many :message_templates
  has_many :special_business_hours
  has_many :special_holidays
  has_many :account_notifications

  # プランごとの設定
  PLAN_NAME =  { "Free" => "フリープラン", "Light" => "ライトプラン", "Standard" => "スタンダードプラン", "Premium" => "プレミアムプラン" }
  RESERVATION_LIMIT = { "Free" => 30, "Light" => 500, "Standard" => 2000, "Premium" => 10000 }
  SEND_MAIL_LIMIT = { "Free" => 50, "Light" => 500, "Standard" => 1000, "Premium" => 10000 }
  STRIPE_CHARGE_FEE = { "Free" => 70, "Light" => 70, "Standard" => 70, "Premium" => 50 }
  CUSTOMER_DISPLAY_LIMIT = { "Free" => 50, "Light" => 10000000000, "Standard" => 10000000000, "Premium" => 10000000000 }
  PLAN_PRICE = { "Free" => 0, "Light" => 980, "Standard" => 1980, "Premium" => 4980 }

  def reservation_limit
    Account::RESERVATION_LIMIT[self.service_plan]
  end

  def send_mail_limit
    Account::SEND_MAIL_LIMIT[self.service_plan]
  end

  def customer_display_limit
    Account::CUSTOMER_DISPLAY_LIMIT[self.service_plan]
  end

  def plan_price
    Account::PLAN_PRICE[self.service_plan]
  end

  def plan_name
    Account::PLAN_NAME[self.service_plan]
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
      'name': self.plan_name,
      'price': self.plan_price,
      'product_type': 'merchant_to_service_subscription'
    }
  end

  def page_links
    # 作成したWebページ、予約ページ、回数券購入ページ、月額課金プラン加入ページのリンクを返却
    result = []
    self.webpages.each do |w|
      result.push({ text: w.tag, value: '/webpages/' + w.id.to_s, label: 'Webページ' })
    end
    self.reserve_frames.each do |r|
      result.push({ text: r.title, value: '/reserve_frame/' + r.id.to_s + '/calendar', label: '予約ページ' })
    end
    self.products.each do |p|
      result.push({ text: p.name, value: '/product/' + p.id.to_s + '/purchase', label: '物販商品購入ページ'  })
    end
    self.ticket_masters.each do |t|
      result.push({ text: t.name, value: '/ticket/' + t.id.to_s + '/purchase/', label: 'チケット購入ページ' })
    end
    self.monthly_payment_plans.each do |m|
      result.push({ text: m.name, value: '/monthly_payment/' + m.id.to_s + '/purchase/', label: '月額課金加入ページ' })
    end
    self.questionnaire_masters.each do |q|
      result.push({ text: q.title, value: '/questionnaire/' + q.id.to_s, label: 'アンケート' })
    end
    result
  end

  def payment_methods
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
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
    questionnaire_answers.order(:id).each do |questionnaire_answer|
      result.push({answer: questionnaire_answer.parse_answer_json,
                   customer_name: questionnaire_answer.customer.full_name,
                   answer_datetime: questionnaire_answer.created_at.strftime("%Y年%m月%d日 %H時%M分")})
    end
    result
  end
end
