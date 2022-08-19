class Reservation < ApplicationRecord
  belongs_to :reserve_frame

  enum payment_method: { localPayment: 0, creditCardPayment: 1, ticket: 2, monthlyPaymentPlan: 3 }
  enum status: { pendingVerifivation: 0, confirm: 1 }
end
