class Api::Internal::LineOfficialAccountsController < ApplicationController
  before_action :merchant_login_only!

  def register_message_api_channel
    account = current_merchant_user.account
    account.line_official_accounts.create!(
      channel_id: line_official_account_params[:channel_id],
      channel_secret: line_official_account_params[:channel_secret],
      channel_token: line_official_account_params[:channel_token]
    )
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def line_official_account_params
    params.require(:line_official_account).permit(:id, :channel_id, :channel_secret, :channel_token)
  end
end
