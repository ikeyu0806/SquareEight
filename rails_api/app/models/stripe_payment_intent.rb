class StripePaymentIntent < ApplicationRecord
  enum system_product_type: { Product: 0,
                              MonthlyPaymentPlan: 1,
                              TicketMaster: 2,
                              Reservation: 3,
                              SyetemPlan: 4 }
  enum payer_type: { EndUser: 0, Merchant: 1 }
end
