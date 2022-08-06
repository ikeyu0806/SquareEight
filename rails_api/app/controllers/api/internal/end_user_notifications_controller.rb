class Api::Internal::EndUserNotificationsController < ApplicationController
  before_action :system_admin_user_login_only!

  def index
    end_user_notifications = EndUserNotification.all
    render json: { status: 'success', end_user_notifications: end_user_notifications }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    EndUserNotification.create!(notification_params)
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def notification_params
    params.require(:notification)
          .permit(:id, :title, :content)
  end
end
