class Reservation < ApplicationRecord
  enum payment_method: { localPayment: 0, creditCardPayment: 1, ticket: 2, monthlyPaymentPlan: 3 }
end
