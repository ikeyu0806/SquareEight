class PurchasedTicket < ApplicationRecord
  belongs_to :ticket_master

  def name
    ticket_master.name
  end

  def description
    ticket_master.description
  end
end
