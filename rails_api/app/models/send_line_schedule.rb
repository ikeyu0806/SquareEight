class SendLineSchedule < ApplicationRecord
  include PublicIdModule
  enum send_status: { Incomplete: 0, Complete: 1 }

  belongs_to :account
  belongs_to :line_official_account
  belongs_to :line_user
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

  def line_official_account_name
    line_official_account.name
  end

  def line_user_display_name
    line_user.line_display_name
  end
end
