class Api::Internal::EndUserNotificationsController < ApplicationController
  def index
    end_user_notifications = current_end_user.end_user_notifications.all
    render json: { status: 'success', end_user_notifications: end_user_notifications }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def show
    end_user_notification = EndUserNotification.find(params[:id])
    render json: { status: 'success', end_user_notification: end_user_notification }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end
end
