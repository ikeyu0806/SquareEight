class SendMailHistory < ApplicationRecord
  include PublicIdModule

  enum message_type: { MessageTemplate: 0, HtmlMailTemplate: 1 }

  belongs_to :account
  has_one :customer, primary_key: :customer_id ,foreign_key: :id

  validates :message_type, presence: true
  validates :email, presence: true
  validates :mail_title, presence: true
  validates :message_body, presence: true

  def send_at
    created_at.strftime("%Y/%m/%d %H:%M")
  end

  def customer_full_name
    customer&.full_name || ''
  end
end
