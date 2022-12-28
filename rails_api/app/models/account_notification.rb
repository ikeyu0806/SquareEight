class AccountNotification < ApplicationRecord
  include PublicIdModule

  belongs_to :account

  before_create :update_read_account_notifications_status_unread

  def update_read_account_notifications_status_unread
    self.account.merchant_users.each do |user|
      user.read_account_notifications_status_UnreadExist!
    end
  end
end
