class SendMailSchedule < ApplicationRecord
  include PublicIdModule

  enum message_template_type: { messageTemplate: 0, htmlMailTemplate: 1, notUse: 2 }
  enum html_template_type: { ImageWithText: 0, ImageWithTextList: 1 }
  # 先頭小文字だと落ちる？
  enum send_status: { Incomplete: 0, Complete: 1, Cancel: 2 }

  belongs_to :account
  has_one :customer, primary_key: :customer_id ,foreign_key: :id
  has_one :stripe_payment_request, primary_key: :stripe_payment_request_id ,foreign_key: :id

  def display_scheduled_datetime
    scheduled_datetime.strftime("%Y/%m/%d %H:%M")
  end

  def customer_fullname
    customer&.full_name || ''
  end

  def past_flg
    scheduled_datetime < Time.zone.now
  end

  def parsed_message_body
    htmlMailTemplate? ? JSON.parse(message_body) : message_body
  end
end
