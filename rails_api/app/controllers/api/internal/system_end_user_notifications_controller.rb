class Api::Internal::SystemEndUserNotificationsController < ApplicationController
  def index
    system_end_user_notifications = SystemEndUserNotification.all
    render json: { status: 'success', system_end_user_notifications: system_end_user_notifications }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    SystemEndUserNotification.create!(notification_params)
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def show
    system_end_user_notification = SystemEndUserNotification.find(params[:id])
    render json: { status: 'success', system_end_user_notification: system_end_user_notification }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update
    SystemEndUserNotification.find(params[:id]).update!(notification_params)
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def notification_params
    params.require(:notification)
          .permit(:id, :title, :content)
  end
end
