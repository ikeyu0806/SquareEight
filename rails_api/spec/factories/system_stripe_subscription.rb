FactoryBot.define do
  factory :free_plan_subscription, class: do
    service_plan { 'Free' }
  end

  factory :light_plan_subscription, class: do
    service_plan { 'Light' }
  end

  factory :standard_plan_subscription, class: do
    service_plan { 'Standard' }
  end

  factory :premium_plan_subscription, class: do
    service_plan { 'Premium' }
  end
end
