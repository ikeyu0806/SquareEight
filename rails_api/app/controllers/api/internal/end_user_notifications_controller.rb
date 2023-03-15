class Api::Internal::EndUserNotificationsController < ApplicationController
  before_action :end_user_login_only!

  def index
    end_user_notifications = current_end_user.end_user_notifications.order(id: :desc)
    # ページネーション
    current_page = params[:current_page].to_i
    display_count = params[:display_count].to_i
    last_page, remainder = end_user_notifications.count.divmod(display_count)
    last_page += 1 if remainder.positive?
    end_user_notifications = end_user_notifications.first(current_page * display_count).last(display_count)
    render json: { status: 'success', end_user_notifications: end_user_notifications, last_page: last_page }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def show
    end_user_notification = EndUserNotification.find_by(public_id: params[:public_id])
    render json: { status: 'success', end_user_notification: end_user_notification }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
