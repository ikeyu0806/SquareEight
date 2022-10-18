class StripePaymentRequest < ApplicationRecord
  enum status: { Pending: 0, Paid: 1 }
  belongs_to :account

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
    ENV["FRONTEND_URL"] + "payment_request/" + self.id.to_s
  end
end
