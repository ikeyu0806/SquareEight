class StripePaymentIntent < ApplicationRecord
  include PublicIdModule

  before_create :update_read_orders_status_unread

  has_one :end_user, foreign_key: :id, primary_key: :end_user_id
  has_one :account, foreign_key: :id, primary_key: :account_id
  has_one :order_item, foreign_key: :id, primary_key: :order_item_id
  has_one :product, foreign_key: :id, primary_key: :product_id
  has_one :ticket_master, foreign_key: :id, primary_key: :ticket_master_id
  has_one :monthly_payment_plan, foreign_key: :id, primary_key: :monthly_payment_plan_id
  has_one :reservation, foreign_key: :id, primary_key: :reservation_id
  has_one :customer, foreign_key: :stripe_customer_id, primary_key: :stripe_customer_id
  has_one :system_stripe_subscription, foreign_key: :id, primary_key: :system_stripe_subscription_id
  enum system_product_type: { Product: 0,
                              MonthlyPaymentPlan: 1,
                              TicketMaster: 2,
                              Reservation: 3,
                              SystemPlan: 4,
                              PaymentRequest: 5 }

  scope :not_refund, -> { where(refund_at: nil) }
  scope :not_system_plan, -> { where.not(system_product_type: "SystemPlan") }

  def update_read_orders_status_unread
    if account.present? && !SystemPlan? && !PaymentRequest?
      account.merchant_users.each do |user|
        user.read_orders_status_UnreadExist!
      end
    end
  end

  def customer_fullname
    end_user&.customer&.full_name
  end

  def account_business_name
    account.business_name
  end

  def product_label_text
    return '商品' if Product?
    return '回数券' if TicketMaster?
    return '月額サブスクリプション' if MonthlyPaymentPlan?
    return '予約' if Reservation?
    return '決済リクエスト' if PaymentRequest?
  end

  def refund_payment
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
    Stripe::Refund.create({
      payment_intent: self.stripe_payment_intent_id,
      reverse_transfer: true
    })
    self.update!(refund_at: Time.zone.now)
  end

  def refund_at_text
    return '' if refund_at.nil?
    refund_at.strftime("%Y年%m月%d日 %H時%m分")
  end

  def quantity
    return '' if order_item.nil?
    return '' if order_item.quantity.zero?
    order_item.quantity.to_s
  end

  def system_stripe_subscription_join_datetext
    return '' if system_stripe_subscription.blank?
    system_stripe_subscription.created_at.strftime("%Y年%m月%d日")
  end
end
