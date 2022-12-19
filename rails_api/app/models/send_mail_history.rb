class SendMailHistory < ApplicationRecord
  include PublicIdModule

  enum message_type: { MessageTemplate: 0, HtmlMailTemplate: 1 }

  belongs_to: account

  validates :message_type, presence: true
  validates :email, presence: true
  validates :mail_title, presence: true
  validates :message_body, presence: true
end
