class SystemStripeSubscription < ApplicationRecord
  enum service_plan: { Free: 0, Light: 1, Standard: 2, Premium: 3 }
end