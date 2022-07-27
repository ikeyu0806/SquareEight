require 'securerandom'

class Api::Internal::MerchantUsersController < ApplicationController
  before_action :merchant_login_only!, only: [:current_merchant_user_info, :disconnect_google_auth]

  VERIFICATION_CODE_LENGTH = 6

  # 仮登録して検証コード送信
  # 同じメールアドレスのユーザが存在していればパスワード上書きして再送信
  def create
    ActiveRecord::Base.transaction do
      if merchant_user_params[:is_create_account]
        account = Account.new(business_name: merchant_user_params["business_name"])
        merchant_user = account.merchant_users.new(merchant_user_params.except(:business_name, :is_create_account))
      else
        merchant_user = MerchantUser.new(merchant_user_params.except(:business_name, :is_create_account))
      end
      merchant_user.email_authentication_status = 'Disabled'
      merchant_user.authority_category = merchant_user_params["authority_category"]
      merchant_user.verification_code = SecureRandom.random_number(10**VERIFICATION_CODE_LENGTH)
      merchant_user.verification_code_expired_at = Time.zone.now + 1.days
      merchant_user.password = merchant_user_params[:password]
      merchant_user.save!
      encode_email = Base64.urlsafe_encode64(merchant_user.email)
      MerchantUserMailer.send_verification_code(merchant_user.email, encode_email, merchant_user.verification_code).deliver_later
    end
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update
    ActiveRecord::Base.transaction do
      merchant_user = MerchantUser.find(params[:id])
      init_email = merchant_user.email
      merchant_user.last_name = merchant_user_params[:last_name]
      merchant_user.first_name = merchant_user_params[:first_name]
      merchant_user.last_name_kana = merchant_user_params[:last_name_kana]
      merchant_user.first_name_kana = merchant_user_params[:first_name_kana]
      merchant_user.password = merchant_user_params[:password]
      # メールアドレス変更/追加時
      if merchant_user_params[:email].present? && init_email != merchant_user_params[:email]
        merchant_user.wait_for_update_email = merchant_user_params[:email]
        merchant_user.verification_code = SecureRandom.random_number(10**VERIFICATION_CODE_LENGTH)
        merchant_user.verification_code_expired_at = Time.zone.now + 1.days
        encode_email = Base64.urlsafe_encode64(merchant_user.wait_for_update_email)
        MerchantUserMailer.send_update_email_verification_code(merchant_user.wait_for_update_email, encode_email, merchant_user.verification_code).deliver_later
      end
      merchant_user.save!
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def find_or_create_by_google_auth
    ActiveRecord::Base.transaction do
      merchant_user = MerchantUser.find_by(google_auth_id: merchant_user_params[:google_auth_id])
      if merchant_user.blank?
        merchant_user = MerchantUser.new
        merchant_user.google_auth_email = merchant_user_params[:google_auth_email]
        merchant_user.google_auth_id = merchant_user_params[:google_auth_id]
        merchant_user.authority_category = 'MerchantAdmin'
        account = Account.new
        merchant_user.account = account
        merchant_user.save!
      end
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def confirm_verification_code
    email = Base64.urlsafe_decode64(merchant_user_params[:email])
    merchant_user = MerchantUser.find_by(email: email)
    render json: { errMessage: "不正な検証コードです" }, status: 401 and return if merchant_user.verification_code != merchant_user_params[:verification_code]
    render json: { errMessage: "検証コードの期限が切れています" }, status: 401 and return if merchant_user.verification_code_expired_at < Time.zone.now
    merchant_user.update!(email_authentication_status: 'Enabled')
    session['merchant_user_id'] = merchant_user.id
    render json: { status: 'success', session_id: session.id, }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def confirm_update_email_verification_code
    email = Base64.urlsafe_decode64(merchant_user_params[:email])
    merchant_user = MerchantUser.find_by(wait_for_update_email: email)
    render json: { errMessage: "不正な検証コードです" }, status: 401 and return if merchant_user.verification_code != merchant_user_params[:verification_code]
    render json: { errMessage: "検証コードの期限が切れています" }, status: 401 and return if merchant_user.verification_code_expired_at < Time.zone.now
    merchant_user.update!(email: merchant_user.wait_for_update_email)
    session['merchant_user_id'] = merchant_user.id
    render json: { status: 'success', session_id: session.id, }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def current_merchant_user_info
    render json: { status: 'success', merchant_user: current_merchant_user }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def disconnect_google_auth
    current_merchant_user.update!(google_auth_id: nil, google_auth_email: nil)
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def merchant_user_params
    params.require(:merchant_user).permit(:id,
                                          :last_name,
                                          :first_name,
                                          :last_name_kana,
                                          :first_name_kana,
                                          :email,
                                          :password,
                                          :password_confirmation,
                                          :authority_category,
                                          :verification_code,
                                          :business_name,
                                          :is_create_account,
                                          :google_auth_id,
                                          :google_auth_email)
  end
end
