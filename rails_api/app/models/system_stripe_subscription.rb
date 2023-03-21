class SystemStripeSubscription < ApplicationRecord
  include PublicIdModule
  include SubscriptionProratedPrice

  belongs_to :account

  enum service_plan: { Free: 0, Light: 1, Standard: 2, Premium: 3 }

  scope :billing_target, -> (target_day) {
    where(billing_cycle_anchor_day: target_day).where(canceled_at: nil)
  }
end
