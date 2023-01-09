class Api::Internal::SendMailHistoriesController < ApplicationController
  before_action :merchant_login_only!

  def index
    send_mail_histories = current_merchant_user.account.send_mail_histories.order(created_at: :desc)
    send_mail_histories = JSON.parse(send_mail_histories.to_json(methods: [:send_at, :customer_fullname, :parsed_message_body]))
    render json: { status: 'success', send_mail_histories: send_mail_histories }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
