class Api::Internal::SendLineHistoriesController < ApplicationController
  before_action :merchant_login_only!

  def index
    send_line_histories = current_merchant_user.account.send_line_histories.order(created_at: :desc)
    # ページネーション
    current_page = params[:current_page].to_i
    display_count = params[:display_count].to_i
    last_page, remainder = send_line_histories.count.divmod(display_count)
    last_page += 1 if remainder.positive?
    send_line_histories = send_line_histories.first(current_page * display_count).last(display_count)
    send_line_histories = JSON.parse(send_line_histories.to_json(methods: [:line_official_account_name, :line_user_display_name]))
    render json: { status: 'success',
                   send_line_histories: send_line_histories,
                   last_page: last_page }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
