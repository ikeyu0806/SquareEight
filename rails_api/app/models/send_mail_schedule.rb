class SendMailSchedule < ApplicationRecord
  include PublicIdModule

  enum message_template_type: { messageTemplate: 0, htmlMailTemplate: 1, notUse: 2 }
  enum html_template_type: { ImageWithText: 0, ImageWithTextList: 1 }

  belongs_to :account

  def display_scheduled_datetime
    scheduled_datetime.strftime("%Y/%m/%d %H:%M")
  end
end
