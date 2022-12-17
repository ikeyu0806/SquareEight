class HtmlMailTemplate < ApplicationRecord
  include PublicIdModule

  belongs_to :account

  validates :name, presence: true
  validates :mail_title, presence: true
  validates :content, presence: true
end
