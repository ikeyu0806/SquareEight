class SystemStripeSubscription < ApplicationRecord
  include PublicIdModule

  belongs_to :account

  enum service_plan: { Free: 0, Light: 1, Standard: 2, Premium: 3 }
end
