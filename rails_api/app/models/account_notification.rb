class AccountNotification < ApplicationRecord
  include PublicIdModule

  belongs_to :account
end
