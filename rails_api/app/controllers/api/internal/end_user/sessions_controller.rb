class Api::Internal::EndUser::SessionsController < ApplicationController
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

  def end_user_params
    params.require(:end_user).permit(:email, :password)
  end
end
