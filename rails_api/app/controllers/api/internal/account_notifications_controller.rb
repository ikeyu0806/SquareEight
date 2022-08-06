class Api::Internal::AccountNotificationsController < ApplicationController
  before_action :system_admin_user_login_only!

  def index
    account_notifications = AccountNotification.all
    render json: { status: 'success', account_notifications: account_notifications }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    AccountNotification.create!(notification_params)
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def show
    account_notification = AccountNotification.find(params[:id])
    render json: { status: 'success', account_notification: account_notification }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update
    AccountNotification.find(params[:id]).update!(notification_params)
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
