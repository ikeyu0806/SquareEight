FactoryBot.define do
  factory :system_admin_user, class: SystemAdminUser do
    email { 'system_admin@develop.com' }
    password { 'Pass1234' }
  end
end
