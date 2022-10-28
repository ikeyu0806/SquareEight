FactoryBot.define do
  factory :reserve_frame_credit_card_payment_price_adult, class: ReserveFrameCreditCardPaymentPrice do
    name { '大人' }
    price { 1000 }
  end

  factory :reserve_frame_credit_card_payment_price_child, class: ReserveFrameCreditCardPaymentPrice do
    name { '子供' }
    price { 500 }
  end
end
