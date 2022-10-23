FactoryBot.define do
  factory :end_user, class: EndUser do
    email { 'end_user@develop.com' }
    last_name { 'デモ' }
    first_name { '一郎' }
    password { 'Pass1234' }
    email_authentication_status { 'Enabled' }
    verification_code { '123456' }
    verification_code_expired_at { Time.zone.now + 1.days }
  end
end
