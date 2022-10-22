FactoryBot.define do
  factory :merchant_user, class: MerchantUser do
    email { 'merchant_user@develop.com' }
    last_name { '鈴木' }
    first_name { '一郎' }
    password { 'Pass1234' }
    authority_category { 'MerchantAdmin' }
    email_authentication_status { 'Enabled' }
  end
end
