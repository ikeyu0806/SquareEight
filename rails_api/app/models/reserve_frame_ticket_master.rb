class ReserveFrameTicketMaster < ApplicationRecord
  belongs_to :reserve_frame
  belongs_to :ticket_master
end
