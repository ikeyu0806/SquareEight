FactoryBot.define do
  factory :stripe_payment_request, class: StripePaymentRequest do
    name { 'demo_payment_request' }
    price { 1000 }
  end
end
