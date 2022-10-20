class CartTicketMaster < ApplicationRecord
  include PublicIdModule

  belongs_to :account
  belongs_to :end_user
  belongs_to :ticket_master
end
