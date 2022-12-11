class LineUser < ApplicationRecord
  include PublicIdModule

  belongs_to :account
end
