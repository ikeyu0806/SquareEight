class Api::Internal::AccountNotificationsController < ApplicationController
  before_action :merchant_login_only!

  def index
    account_notifications = current_merchant_user.account.account_notifications
    render json: { status: 'success', account_notifications: account_notifications }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def notification_params
    params.require(:notification)
          .permit(:id, :title, :content)
  end
end
