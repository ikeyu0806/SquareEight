FactoryBot.define do
  factory :room_resource, class: Resource do
    name { '会議室' }
    quantity { 10 }
  end
end
