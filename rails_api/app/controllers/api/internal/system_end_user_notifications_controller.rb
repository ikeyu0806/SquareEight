class Api::Internal::SystemEndUserNotificationsController < ApplicationController
  before_action :end_user_or_system_admin_user_login_only!, only: [:index, :show]
  before_action :system_admin_user_login_only!, only: [:create, :update]

  def index
    system_end_user_notifications = SystemEndUserNotification.all
    render json: { status: 'success', system_end_user_notifications: system_end_user_notifications }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def create
    SystemEndUserNotification.create!(notification_params)
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def show
    system_end_user_notification = SystemEndUserNotification.find_by(public_id: params[:public_id])
    render json: { status: 'success', system_end_user_notification: system_end_user_notification }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update
    SystemEndUserNotification.find_by(public_id: params[:public_id]).update!(notification_params)
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def destroy
    notification = SystemEndUserNotification.find_by(public_id: params[:public_id])
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
