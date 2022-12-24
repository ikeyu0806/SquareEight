class Api::Internal::SendLineHistoriesController < ApplicationController
  before_action :merchant_login_only!

  def index
    send_line_histories = current_merchant_user.account.send_line_histories
    send_line_histories = JSON.parse(send_line_histories.to_json(methods: [:line_official_account_name, :line_user_display_name]))
    render json: { status: 'success', send_line_histories: send_line_histories }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
