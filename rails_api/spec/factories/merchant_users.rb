FactoryBot.define do
  factory :business_user, class: MerchantUser do
    email { 'merchant_user@develop.com' }
    name { 'GCS管理者' }
    password { 'Pass1234' }
    authority_category { 'gcs_admin' }
    authentication_status { 'Enabled' }
  end
end
