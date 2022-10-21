class SharedComponent < ApplicationRecord
  include PublicIdModule

  belongs_to :account
end
