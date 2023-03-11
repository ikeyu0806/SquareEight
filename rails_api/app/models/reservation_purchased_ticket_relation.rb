class ReservationPurchasedTicketRelation < ApplicationRecord
  include PublicIdModule

  belongs_to :reservation
  belongs_to :purchased_ticket
end
