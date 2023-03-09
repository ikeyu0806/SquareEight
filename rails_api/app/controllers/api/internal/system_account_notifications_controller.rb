class Api::Internal::SystemAccountNotificationsController < ApplicationController
  before_action :merchant_or_system_admin_user_login_only!, only: [:index, :show]
  before_action :system_admin_user_login_only!, only: [:create, :update]

  def index
    system_account_notifications = SystemAccountNotification.all
    # ページネーション
    current_page = params[:current_page].to_i
    display_count = params[:display_count].to_i
    last_page, remainder = system_account_notifications.count.divmod(display_count)
    last_page += 1 if remainder.positive?
    system_account_notifications = system_account_notifications.first(current_page * display_count).last(display_count)
    render json: { status: 'success',
                   system_account_notifications: system_account_notifications,
                   last_page: last_page }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def create
    SystemAccountNotification.create!(notification_params)
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def show
    system_account_notification = SystemAccountNotification.find_by(public_id: params[:public_id])
    render json: { status: 'success', system_account_notification: system_account_notification }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update
    SystemAccountNotification.find_by(public_id: params[:public_id]).update!(notification_params)
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def destroy
    notification = SystemAccountNotification.find_by(public_id: params[:public_id])
    notification.destroy
    render json: { status: 'success' }, status: 200
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
