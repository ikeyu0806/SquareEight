class SendMailSchedule < ApplicationRecord
  include PublicIdModule

  enum message_template_type: { messageTemplate: 0, htmlMailTemplate: 1, notUse: 2 }

  belongs_to :account
end
