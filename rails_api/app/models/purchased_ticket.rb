class PurchasedTicket < ApplicationRecord
  belongs_to :ticket_master

  validates :expired_at, presence: true
  validates :remain_number, presence: true

  def name
    ticket_master.name
  end

  def description
    ticket_master.description
  end

  def display_expired_at
    expired_at.strftime("%Y/%m/%d")
  end

  def ticket_master_id
    ticket_master.id
  end
end
