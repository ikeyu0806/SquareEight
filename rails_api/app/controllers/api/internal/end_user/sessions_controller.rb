class Api::Internal::EndUser::SessionsController < ApplicationController
  def login_status
    raise if current_end_user.blank?
    render json: { status: 'success', user: current_end_user}
  rescue => e
    render json: { status: 'fail', error: e }, status: 401
  end

  def create
    end_user = EndUser.find_by(email: end_user_params[:email])
    raise "メールアドレスとパスワードが一致しません" unless end_user.authenticate(end_user_params[:password])
    session['end_user_id'] = end_user.id
    render json: { status: 'success',
                   session_id: session.id,
                   email: end_user.email,
                   end_user: end_user,
                   error: nil }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 401
  end

  def create_by_google_auth
    raise if end_user_params[:google_auth_id].blank?
    end_user = EndUser.find_by(google_auth_id: end_user_params[:google_auth_id])
    session['end_user_id'] = end_user.id
    render json: { status: 'success',
                   session_id: session.id,
                   email: end_user.google_auth_email,
                   end_user: end_user,
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

  def end_user_params
    params.require(:end_user).permit(:email, :password, :google_auth_id, :google_auth_email)
  end
end
