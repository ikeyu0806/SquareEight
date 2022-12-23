class SendLineSchedule < ApplicationRecord
  include PublicIdModule
  enum send_status: { Incomplete: 0, Complete: 1 }

  belongs_to :account
end
