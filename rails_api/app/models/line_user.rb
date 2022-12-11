class LineUser < ApplicationRecord
  include PublicIdModule

  belongs_to :account
  has_many :line_official_account_user_relation
end
