class ShopTicketMaster < ApplicationRecord
  include PublicIdModule

  belongs_to :shop
  belongs_to :ticket_master
end
