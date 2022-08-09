class CartTicketMaster < ApplicationRecord
  belongs_to :account
  belongs_to :end_user
  belongs_to :ticket_master
end
