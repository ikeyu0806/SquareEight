class StripePerson < ApplicationRecord
  include PublicIdModule

  belongs_to :account
end
