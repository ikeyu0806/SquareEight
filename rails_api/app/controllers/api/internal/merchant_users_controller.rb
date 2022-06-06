require 'securerandom'

class Api::Internal::MerchantUsersController < ApplicationController
  VERIFICATION_CODE_LENGTH = 6
  # 仮登録して検証コード送信
  # 同じメールアドレスのユーザが存在していればパスワード上書きして再送信
  def create
    ActiveRecord::Base.transaction do
      merchant_user = MerchantUser.new(merchant_user_params)
      merchant_user.authentication_status = 'Disabled'
      merchant_user.verification_code = SecureRandom.random_number(10**VERIFICATION_CODE_LENGTH)
      merchant_user.verification_code_expired_at = Time.zone.now + 1.hours
      merchant_user.password = merchant_user_params[:password]
      merchant_user.save!
      encode_email = Base64.urlsafe_encode64(merchant_user.email)
      MerchantUserMailer.send_verification_code(merchant_user.email, encode_email, merchant_user.verification_code).deliver_later
    end
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def confirm_verification_code
    email = Base64.urlsafe_decode64(merchant_user_params[:email])
    merchant_user = MerchantUser.find_by(email: email)
    raise "不正な検証コードです" if merchant_user.verification_code != merchant_user_params[:verification_code]
    raise "検証コードの期限が切れています" if merchant_user.verification_code_expired_at < Time.zone.now
    merchant_user.update!(authentication_status: 'Enabled')
    session['merchant_user_id'] = merchant_user.id
    render json: { status: 'success', session_id: session.id, }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def merchant_user_params
    params.require(:merchant_user).permit(:id,
                                 :email,
                                 :password,
                                 :password_confirmation,
                                 :verification_code)
  end
end
