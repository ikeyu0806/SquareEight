class Api::Internal::SendMailHistoriesController < ApplicationController
  before_action :merchant_login_only!

  def index
    send_mail_histories = current_merchant_user.account.send_mail_histories
    render json: { status: 'success', send_mail_histories: send_mail_histories }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
