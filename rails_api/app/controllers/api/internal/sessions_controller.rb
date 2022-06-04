class Api::Internal::SessionsController < ApplicationController
  def create
    user = User.find_by(email: user_params[:email])
    raise "メールアドレスとパスワードが一致しません" unless user.authenticate(user_params[:password])
    session['user_id'] = user.id
    render json: { status: 'success',
                   session_id: session.id,
                   email: user.email,
                   user: user,
                   error: nil }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 401
  end

  def destroy
    Rails.cache.delete('_session_id:2::' + Digest::SHA256.hexdigest(request.headers["Session-Id"]))
    render json: { status: 'success',
                   session_id: request.headers["Session-Id"] }
  rescue => error
    render json: { statue: 'fail', error: e }, status: 500
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
