class ReservationLocalPaymentPrice < ApplicationRecord
  include PublicIdModule

  belongs_to :reservation
end
