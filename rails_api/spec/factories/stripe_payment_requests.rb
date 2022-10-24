FactoryBot.define do
  factory :stripe_payment_request, class: StripePaymentRequest do
    price { 1000 }
  end
end
