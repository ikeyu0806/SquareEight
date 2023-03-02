class Api::Internal::System::AccountsController < ApplicationController
  before_action :system_admin_user_login_only!

  def index
    accounts = Account.all
    render json: { status: 'success', accounts: accounts }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
