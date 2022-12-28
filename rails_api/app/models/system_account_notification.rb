class SystemAccountNotification < ApplicationRecord
  include PublicIdModule

  before_create :update_read_business_notifications_status_unread

  def update_read_business_notifications_status_unread
    MerchantUser.update_all(read_business_notifications_status: 'UnreadExist')
  end
end
