class SystemAccountNotification < ApplicationRecord
  include PublicIdModule

  before_create :update_read_dashboard_status_unread

  def update_read_dashboard_status_unread
    MerchantUser.update_all(read_dashboard: 'UnreadExist')
  end
end
