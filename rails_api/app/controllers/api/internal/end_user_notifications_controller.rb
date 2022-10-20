class Api::Internal::EndUserNotificationsController < ApplicationController
  def index
    end_user_notifications = current_end_user.end_user_notifications.all
    render json: { status: 'success', end_user_notifications: end_user_notifications }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def show
    end_user_notification = EndUserNotification.find_by(public_id: params[:id])
    render json: { status: 'success', end_user_notification: end_user_notification }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end
end
