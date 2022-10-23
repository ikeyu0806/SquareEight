FactoryBot.define do
  factory :merchant_stripe_subscription, class: MerchantStripeSubscription do
    stripe_subscription_id { 'demo_stripe_subscription_id' }
  end
end
