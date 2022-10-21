class AccountS3Image < ApplicationRecord
  include PublicIdModule

  belongs_to :account
end
