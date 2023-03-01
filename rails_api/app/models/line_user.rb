class LineUser < ApplicationRecord
  include PublicIdModule

  belongs_to :account
  has_one :customer, foreign_key: :id, primary_key: :customer_id
  has_many :line_official_account_user_relation

  validates :line_display_name, presence: true
  validates :line_picture_url, presence: true
end
