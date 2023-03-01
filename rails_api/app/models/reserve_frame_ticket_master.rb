class ReserveFrameTicketMaster < ApplicationRecord
  include PublicIdModule

  belongs_to :reserve_frame
  belongs_to :ticket_master

  validates :consume_number, presence: true
end
