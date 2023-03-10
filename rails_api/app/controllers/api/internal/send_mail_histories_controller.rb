class Api::Internal::SendMailHistoriesController < ApplicationController
  before_action :merchant_login_only!

  def index
    send_mail_histories = current_merchant_user.account.send_mail_histories.order(created_at: :desc)
    # ページネーション
    current_page = params[:current_page].to_i
    display_count = params[:display_count].to_i
    last_page, remainder = send_mail_histories.count.divmod(display_count)
    last_page += 1 if remainder.positive?
    send_mail_histories = send_mail_histories.first(current_page * display_count).last(display_count)
    send_mail_histories = JSON.parse(send_mail_histories.to_json(methods: [:send_at, :customer_fullname, :parsed_message_body]))
    render json: { status: 'success', send_mail_histories: send_mail_histories, last_page: last_page }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
