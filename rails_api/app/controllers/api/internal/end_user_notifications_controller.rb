class Api::Internal::EndUserNotificationsController < ApplicationController
  before_action :end_user_login_only!

  def index
    end_user_notifications = current_end_user.end_user_notifications.all
    render json: { status: 'success', end_user_notifications: end_user_notifications }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end
end
