
FactoryBot.define do
  factory :order, class: Order do
    name { 'demo' }
    address { '東京都目黒区目黒本町' }
    postal_code { '1231234' }
    delivery_charge { 100 }
  end
end
