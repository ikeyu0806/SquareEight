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
      UserMailer.send_verification_code(user.email, encode_email, user.verification_code)
    end
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def confirm_verification_code
  end

  private

  def user_params
    params.require(:user).permit(:id, :email, :password, :password_confirmation)
  end
end
