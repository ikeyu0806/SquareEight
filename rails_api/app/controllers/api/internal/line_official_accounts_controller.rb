class Api::Internal::LineOfficialAccountsController < ApplicationController
  before_action :merchant_login_only!

  def index
    line_official_accounts = current_merchant_user.account.line_official_accounts.order(:id)
    line_official_accounts = JSON.parse(line_official_accounts.to_json(methods: [:messaging_api_webhook_url]))
    render json: { status: 'success', line_official_accounts: line_official_accounts }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def line_users
    line_official_account = LineOfficialAccount.find_by(public_id: params[:public_id])
    line_users = line_official_account.line_users
    render json: { status: 'success', line_users: line_users }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def register_message_api_channel
    account = current_merchant_user.account
    account.line_official_accounts.create!(
      name: line_official_account_params[:name],
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
    params.require(:line_official_account).permit(:id, :name, :channel_id, :channel_secret, :channel_token)
  end
end
