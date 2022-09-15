class StripePaymentIntent < ApplicationRecord
  has_one :end_user, foreign_key: :id, primary_key: :end_user_id
  has_one :account, foreign_key: :id, primary_key: :account_id
  has_one :product, foreign_key: :id, primary_key: :product_id
  has_one :ticket_master, foreign_key: :id, primary_key: :ticket_master_id
  has_one :monthly_payment_plan, foreign_key: :id, primary_key: :monthly_payment_plan_id
  has_one :reservation, foreign_key: :id, primary_key: :reservation_id

  enum system_product_type: { Product: 0,
                              MonthlyPaymentPlan: 1,
                              TicketMaster: 2,
                              Reservation: 3,
                              SyetemPlan: 4 }
end
