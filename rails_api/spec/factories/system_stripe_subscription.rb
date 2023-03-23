FactoryBot.define do
  factory :light_plan_subscription, class: SystemStripeSubscription do
    service_plan { 'Light' }
  end

  factory :standard_plan_subscription, class: SystemStripeSubscription do
    service_plan { 'Standard' }
  end

  factory :premium_plan_subscription, class: SystemStripeSubscription do
    service_plan { 'Premium' }
  end
end
