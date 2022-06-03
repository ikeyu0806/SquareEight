class Api::Internal::SessionsController < ApplicationController
  def create
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
    params.require(:user).permit(:subject, :company_key)
  end
end
