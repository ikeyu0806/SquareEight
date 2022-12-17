class HtmlMailTemplate < ApplicationRecord
  include PublicIdModule

  enum template_type: { ImageWithText: 0, ImageWithTextList: 1 }

  belongs_to :account

  validates :name, presence: true
  validates :mail_title, presence: true
  validates :content, presence: true
end
