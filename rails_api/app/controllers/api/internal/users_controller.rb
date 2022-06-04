require 'securerandom'

class Api::Internal::UsersController < ApplicationController
  VERIFICATION_CODE_LENGTH = 6
  # 仮登録して検証コード送信
  # 同じメールアドレスのユーザが存在していればパスワード上書きして再送信
  def create
    ActiveRecord::Base.transaction do
      user = User.new(user_params)
      user.authentication_status = 'Disabled'
      user.verification_code = SecureRandom.random_number(10**VERIFICATION_CODE_LENGTH)
      user.verification_code_expired_at = Time.zone.now + 1.hours
      user.password = user_params[:password]
      user.save!
      encode_email = Base64.urlsafe_encode64(user.email)
      UserMailer.send_verification_code(user.email, encode_email, user.verification_code).deliver_later
    end
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def confirm_verification_code
    email = Base64.urlsafe_decode64(user_params[:email])
    user = User.find_by(email: email)
    raise "不正な検証コードです" if user.verification_code != user_params[:verification_code]
    raise "検証コードの期限が切れています" if user.verification_code_expired_at < Time.zone.now
    user.update!(authentication_status: 'Enabled')
    session['user_id'] = user.id
    render json: { status: 'success', session_id: session.id, }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def user_params
    params.require(:user).permit(:id,
                                 :email,
                                 :password,
                                 :password_confirmation,
                                 :verification_code)
  end
end
