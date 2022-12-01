FactoryBot.define do
  factory :merchant_user, class: MerchantUser do
    email { 'merchant_user@develop.com' }
    wait_for_update_email { 'merchant_user@develop.com' }
    last_name { 'デモ' }
    first_name { '一郎' }
    password { 'Pass1234' }
    authority_category { 'RootUser' }
    email_authentication_status { 'Enabled' }
    verification_code { '123456' }
    verification_code_expired_at { Time.zone.now + 1.days }
  end
end
