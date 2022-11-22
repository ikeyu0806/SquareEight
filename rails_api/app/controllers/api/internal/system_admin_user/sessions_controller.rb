class Api::Internal::SystemAdminUser::SessionsController < ApplicationController
  def login_status
    raise if current_system_admin_user.blank?
    render json: { status: 'success', user: current_system_admin_user}
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: e }, status: 401
  end

  def create
    system_admin_user = SystemAdminUser.find_by(email: system_admin_user_params[:email])
    raise "メールアドレスとパスワードが一致しません" unless system_admin_user.authenticate(system_admin_user_params[:password])
    session['system_admin_user_id'] = system_admin_user.id
    render json: { status: 'success',
                   session_id: session.id,
                   email: system_admin_user.email,
                   system_admin_user: system_admin_user,
                   error: nil }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 401
  end

  def create_by_google_auth
    raise if system_admin_user_params[:google_auth_id].blank?
    system_admin_user = SystemAdminUser.find_by(google_auth_id: system_admin_user_params[:google_auth_id])
    session['system_admin_user_id'] = system_admin_user.id
    render json: { status: 'success',
                   session_id: session.id,
                   email: system_admin_user.google_auth_email,
                   system_admin_user: system_admin_user,
                   error: nil }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 401
  end

  def destroy
    Rails.cache.delete('_session_id:2::' + Digest::SHA256.hexdigest(request.headers["Session-Id"]))
    render json: { status: 'success',
                   session_id: request.headers["Session-Id"] }
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: e }, status: 500
  end

  private

  def system_admin_user_params
    params.require(:system_admin_user).permit(:email, :password, :google_auth_id, :google_auth_email)
  end
end
