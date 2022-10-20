class ReservationCreditCardPaymentPrice < ApplicationRecord
  include PublicIdModule

  belongs_to :reservation
end
