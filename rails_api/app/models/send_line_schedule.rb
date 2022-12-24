class SendLineSchedule < ApplicationRecord
  include PublicIdModule
  enum send_status: { Incomplete: 0, Complete: 1 }

  belongs_to :account
  belongs_to :line_official_account
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

  def line_official_account_name
    line_official_account.name
  end
end
