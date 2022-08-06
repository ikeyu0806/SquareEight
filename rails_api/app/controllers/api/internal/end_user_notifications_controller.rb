class Api::Internal::EndUserNotificationsController < ApplicationController
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

  def show
    end_user_notification = EndUserNotification.find(params[:id])
    render json: { status: 'success', end_user_notification: end_user_notification }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update
    EndUserNotification.find(params[:id]).update!(notification_params)
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
