class Api::Internal::SendMailSchedulesController < ApplicationController
  before_action :merchant_login_only!

  def index
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def create
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def send_mail_schedules_params
    params.require(:send_mail_schedules)
          .permit(:id, )
  end
end
