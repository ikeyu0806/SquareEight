FactoryBot.define do
  factory :end_user, class: EndUser do
    email { 'end_user@develop.com' }
    last_name { 'デモ' }
    first_name { '一郎' }
    password { 'Pass1234' }
    email_authentication_status { 'Enabled' }
  end
end
