FactoryBot.define do
  factory :merchant_user, class: MerchantUser do
    email { 'merchant_user@develop.com' }
    wait_for_update_email { 'merchant_user@develop.com' }
    last_name { 'デモ' }
    first_name { '一郎' }
    password { 'Pass1234' }
    authority_category { 'MerchantAdmin' }
    email_authentication_status { 'Enabled' }
  end
end
