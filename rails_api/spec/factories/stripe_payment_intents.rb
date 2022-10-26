FactoryBot.define do
  factory :stripe_payment_intent_light_plan, class: StripePaymentIntent do
    system_plan_name { 'ライトプラン' }
    amount { 980 }
    order_date { Time.zone.now.strftime("%Y年 %月 %d日") }
    stripe_payment_intent_id { 'demo_stripe_payment_intent_id' }
    stripe_customer_id { 'demo_stripe_customer_id' }
    currency { 'jpy' }
  end
end
