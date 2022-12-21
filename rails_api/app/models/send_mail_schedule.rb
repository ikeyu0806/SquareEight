class SendMailSchedule < ApplicationRecord
  include PublicIdModule

  belongs_to :account
end
