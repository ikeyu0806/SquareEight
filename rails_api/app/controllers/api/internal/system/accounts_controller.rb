class Api::Internal::System::AccountsController < ApplicationController
  before_action :system_admin_user_login_only!

  def index
    accounts = Account.all
    render json: { status: 'success', accounts: accounts }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def show
    account = Account.find_by(public_id: params[:public_id])
    render json: { status: 'success', account: account }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
