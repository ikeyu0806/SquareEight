class StripePaymentRequest < ApplicationRecord
  include PublicIdModule

  enum status: { Pending: 0, Paid: 1 }
  enum send_method: { Email: 0, LINE: 2 }

  belongs_to :account
  has_one :customer, foreign_key: :id, primary_key: :customer_id
  has_one :line_user, foreign_key: :id, primary_key: :line_user_id

  def display_status
    case status
    when 'Pending' then
      return '未払い'
    when 'Paid' then
      return '支払い済み'
    else
      return '不明'
    end
  end

  def request_url
    ENV["FRONTEND_URL"] + "/payment_request/" + self.public_id
  end

  def billing_customer_name
    last_name = customer.last_name || ''
    first_name = customer.first_name || ''
    last_name + first_name
  end

  def billing_customer_email
    customer.email
  end

  def line_display_name
    line_user&.line_display_name
  end

  def line_picture_url
    line_user&.line_picture_url
  end
end
