FactoryBot.define do
  factory :business_account, class: Account do
    business_name { 'テストアカウント' }
  end

  factory :free_account, class: Account do
    business_name { 'テストアカウント' }
    service_plan { 'Free' }
    trial_end_datetime { Time.zone.now - 100.years }
  end

  factory :light_plan_account, class: Account do
    business_name { 'テストアカウント' }
    service_plan { 'Light' }
    trial_end_datetime { Time.zone.now - 100.years }
  end

  factory :standard_plan_account, class: Account do
    business_name { 'テストアカウント' }
    service_plan { 'Standard' }
    trial_end_datetime { Time.zone.now - 100.years }
  end

  factory :premium_plan_account, class: Account do
    business_name { 'テストアカウント' }
    service_plan { 'Premium' }
    trial_end_datetime { Time.zone.now - 100.years }
  end

  factory :trial_account, class: Account do
    business_name { 'テストアカウント' }
    service_plan { 'Free' }
    trial_end_datetime { Time.zone.now + 100.years }
  end
end
