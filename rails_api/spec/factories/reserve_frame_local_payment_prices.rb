FactoryBot.define do
  factory :reserve_frame_local_payment_price_adult, class: ReserveFrameLocalPaymentPrice do
    name { '大人' }
    price { 1000 }
  end

  factory :reserve_frame_local_payment_price_child, class: ReserveFrameLocalPaymentPrice do
    name { '子供' }
    price { 500 }
  end
end
