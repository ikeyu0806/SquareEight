class StripePaymentRequest < ApplicationRecord
  enum status: { Pending: 0, Paid: 1 }
  belongs_to :account
end
