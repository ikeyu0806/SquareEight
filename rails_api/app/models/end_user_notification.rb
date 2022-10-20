class EndUserNotification < ApplicationRecord
  include PublicIdModule

  belongs_to :end_user
end
