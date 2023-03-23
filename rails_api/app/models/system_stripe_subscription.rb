class SystemStripeSubscription < ApplicationRecord
  include PublicIdModule
  include SubscriptionProratedPrice

  belongs_to :account

  # これ請求には使わないけど履歴、データ取得的に使っとく
  enum service_plan: { Free: 0, Light: 1, Standard: 2, Premium: 3 }

  scope :billing_target, -> (target_day) {
    where(billing_cycle_anchor_day: target_day).where(canceled_at: nil)
  }

  def stripe_serivice_plan_subscription_metadata
    {
      'account_id': account.id,
      'system_plan_name': account.plan_name,
      'price': account.plan_price,
      'product_type': 'system_plan',
      'system_stripe_subscription_id': self.id
    }
  end
end
