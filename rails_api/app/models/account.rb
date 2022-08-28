class Account < ApplicationRecord
  has_one :business_hour
  has_many :merchant_users
  has_many :websites
  has_many :webpages, through: :websites
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
  has_many :message_templates

  def page_links
    # 作成したWebページ、予約ページ、回数券購入ページ、月額課金プラン加入ページのリンクを返却
    result = []
    self.webpages.each do |w|
      result.push({ text: w.tag, value: '/webpages/' + w.id.to_s, label: 'Webページ' })
    end
    self.reserve_frames.each do |r|
      result.push({ text: r.title, value: '/reserve/' + r.id.to_s, label: '予約ページ' })
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
      result.push({ text: q.title, value: '/questionnaire/' + q.id, label: 'アンケート' })
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
end
