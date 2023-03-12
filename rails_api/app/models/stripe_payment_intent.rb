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
  enum system_product_type: { Product: 0,
                              MonthlyPaymentPlan: 1,
                              TicketMaster: 2,
                              Reservation: 3,
                              SystemPlan: 4,
                              PaymentRequest: 5 }

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
    return '' if order_item.blank?
    order_item.product_label_text
  end

  def refund_payment
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
    Stripe::Refund.create({payment_intent: self.stripe_payment_intent_id})
    self.update!(refund_at: Time.zone.now)
  end

  def refund_at_text
    return '' if refund_at.nil?
    refund_at.strftime("%Y年%M月%d日 %k時%m分")
  end
end
