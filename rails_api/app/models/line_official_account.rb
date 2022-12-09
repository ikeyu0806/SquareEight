class LineOfficialAccount < ApplicationRecord
  include PublicIdModule

  belongs_to :account
end
