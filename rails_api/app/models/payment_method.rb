class PaymentMethod < ApplicationRecord
  belongs_to :account

  enum payment_type: { stripeCard: 0 }
end
