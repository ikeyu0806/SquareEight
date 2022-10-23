FactoryBot.define do
  factory :delivery_target, class: DeliveryTarget do
    first_name { '太郎' }
    last_name { 'デモ' }
    postal_code { '123-1234' }
    state { '東京都' }
    city { '目黒区' }
    town { '目黒' }
    line1 { '一丁目' }
    line2 { '1-1' }
    phone_number { '09011112222' }
    is_default { true }
  end
end
