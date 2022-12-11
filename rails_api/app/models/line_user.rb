class LineUser < ApplicationRecord
  include PublicIdModule

  belongs_to :line_official_account
end
