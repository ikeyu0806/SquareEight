class StripePaymentRequest < ApplicationRecord
  include PublicIdModule

  enum status: { Pending: 0, Paid: 1 }
  belongs_to :account
  belongs_to :customer

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
end
