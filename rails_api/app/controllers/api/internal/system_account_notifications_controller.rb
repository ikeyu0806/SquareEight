class Api::Internal::SystemAccountNotificationsController < ApplicationController
  def index
    system_account_notifications = SystemAccountNotification.all
    render json: { status: 'success', system_account_notifications: system_account_notifications }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    SystemAccountNotification.create!(notification_params)
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def show
    system_account_notification = SystemAccountNotification.find(params[:id])
    render json: { status: 'success', system_account_notification: system_account_notification }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update
    SystemAccountNotification.find(params[:id]).update!(notification_params)
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
