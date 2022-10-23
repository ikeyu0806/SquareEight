FactoryBot.define do
  factory :customer, class: Customer do
    first_name { 'hoge' }
    last_name { 'huga' }
    email { 'demo@example.com' }
    phone_number { '09022223333' }
  end
end
