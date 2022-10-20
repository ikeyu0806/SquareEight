class Api::Internal::AccountNotificationsController < ApplicationController
  def index
    account_notifications = AccountNotification.all
    render json: { status: 'success', account_notifications: account_notifications }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def show
    account_notification = AccountNotification.find_by(public_id: params[:public_id])
    render json: { status: 'success', account_notification: account_notification }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def notification_params
    params.require(:notification)
          .permit(:id, :title, :content)
  end
end
