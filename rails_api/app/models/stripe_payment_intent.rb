class StripePaymentIntent < ApplicationRecord
  include PublicIdModule

  before_create :update_read_sales_status_unread

  has_one :end_user, foreign_key: :id, primary_key: :end_user_id
  has_one :account, foreign_key: :id, primary_key: :account_id
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

  def update_read_sales_status_unread
    if account.present?
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
end
