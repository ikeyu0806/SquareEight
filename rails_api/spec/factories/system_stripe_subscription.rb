FactoryBot.define do
  factory :free_plan_subscription, class: SystemStripeSubscription do
    service_plan { 'Free' }
    stripe_subscription_id { '1234-abcd' }
  end

  factory :light_plan_subscription, class: SystemStripeSubscription do
    service_plan { 'Light' }
    stripe_subscription_id { '1234-abcd' }
  end

  factory :standard_plan_subscription, class: SystemStripeSubscription do
    service_plan { 'Standard' }
    stripe_subscription_id { '1234-abcd' }
  end

  factory :premium_plan_subscription, class: SystemStripeSubscription do
    service_plan { 'Premium' }
    stripe_subscription_id { '1234-abcd' }
  end
end
