class Api::Internal::AccountNotificationsController < ApplicationController
  before_action :merchant_login_only!

  def index
    account_notifications = current_merchant_user.account.account_notifications.order(id: :desc)
    # ページネーション
    current_page = params[:current_page].to_i
    display_count = params[:display_count].to_i
    last_page, remainder = account_notifications.count.divmod(display_count)
    last_page += 1 if remainder.positive?
    account_notifications = account_notifications.first(current_page * display_count).last(display_count)
    render json: { status: 'success',
                   account_notifications: account_notifications,
                   last_page: last_page }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def notification_params
    params.require(:notification)
          .permit(:id, :title, :content)
  end
end
