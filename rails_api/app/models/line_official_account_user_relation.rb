class LineOfficialAccountUserRelation < ApplicationRecord
  include PublicIdModule

  belongs_to :line_official_account
  belongs_to :line_user
end
