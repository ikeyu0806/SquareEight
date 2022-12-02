require 'securerandom'

class Api::Internal::MerchantUsersController < ApplicationController
  before_action :merchant_login_only!, only: [:index, :update, :current_merchant_user_info, :disconnect_google_auth, :invite_additional_user]

  VERIFICATION_CODE_LENGTH = 6

  def index
    merchant_users = current_merchant_user.account.merchant_users.order(:id)
    render json: { merchant_users: merchant_users, status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  # 仮登録して検証コード送信
  # 同じメールアドレスのユーザが存在していればパスワード上書きして再送信
  def invite_root_user
    ActiveRecord::Base.transaction do
      if merchant_user_params[:is_create_account]
        account = Account.new(business_name: merchant_user_params["business_name"])
        shared_component = SharedComponent.new(account: account)
        merchant_user = account.merchant_users.new(merchant_user_params.except(:business_name, :is_create_account))
      else
        merchant_user = MerchantUser.new(merchant_user_params.except(:business_name, :is_create_account))
      end
      merchant_user.email_authentication_status = 'Disabled'
      merchant_user.authority_category = "RootUser"
      merchant_user.verification_code = SecureRandom.random_number(10**VERIFICATION_CODE_LENGTH)
      merchant_user.verification_code_expired_at = Time.zone.now + 1.days
      merchant_user.password = merchant_user_params[:password]
      # root_userはallowで始まるカラムを全部trueにする
      permission_columns = MerchantUser.column_names.select{|column| column.match(/^allow/)}
      permission_columns.each do |column|
        merchant_user.send(column + "=", 'Allow')
      end
      merchant_user.save!
      shared_component.save! if shared_component.present?
      encode_email = Base64.urlsafe_encode64(merchant_user.email)
      MerchantUserMailer.send_verification_code(merchant_user.email, encode_email, merchant_user.verification_code).deliver_now
    end
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def invite_additional_user
    merchant_user = MerchantUser.new(merchant_user_params)
    merchant_user.account = current_merchant_user.account
    merchant_user.email_authentication_status = 'Disabled'
    merchant_user.verification_code = SecureRandom.random_number(10**VERIFICATION_CODE_LENGTH)
    merchant_user.verification_code_expired_at = Time.zone.now + 1.days
    if merchant_user.authority_category == 'AdminUser'
      merchant_user.set_admin_user_default_permission
    elsif merchant_user.authority_category == 'CommonUser'
      merchant_user.set_common_user_default_permission
    end
    encode_email = Base64.urlsafe_encode64(merchant_user.email)
    MerchantUserMailer.send_additional_user_verification_code(merchant_user.email, encode_email, merchant_user.verification_code).deliver_now
    merchant_user.save!
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update
    ActiveRecord::Base.transaction do
      merchant_user = MerchantUser.find_by(public_id: params[:public_id])
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
        MerchantUserMailer.send_update_email_verification_code(merchant_user.wait_for_update_email, encode_email, merchant_user.verification_code).deliver_now
      end
      merchant_user.save!
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def find_or_create_by_google_auth
    ActiveRecord::Base.transaction do
      # ログイン済みであればGoogle接続追加
      if current_merchant_user.present?
        # current_user直接更新できないので別の変数を作る
        merchant_user = MerchantUser.find(current_merchant_user.id)
        merchant_user.google_auth_email = merchant_user_params[:google_auth_email]
        merchant_user.google_auth_id = merchant_user_params[:google_auth_id]
        merchant_user.save!
      else
        # 未ログインであればfind_or_create
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
      end
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def confirm_verification_code
    email = Base64.urlsafe_decode64(merchant_user_params[:email])
    merchant_user = MerchantUser.find_by(email: email)
    render json: { errMessage: "不正な検証コードです" }, status: 401 and return if merchant_user.verification_code != merchant_user_params[:verification_code]
    render json: { errMessage: "検証コードの期限が切れています" }, status: 401 and return if merchant_user.verification_code_expired_at < Time.zone.now
    merchant_user.update!(email_authentication_status: 'Enabled')
    session['merchant_user_id'] = merchant_user.id
    MerchantUserMailer.registration_complete(merchant_user.email).deliver_now
    render json: { status: 'success', session_id: session.id, }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def confirm_additional_user_verification_code
    email = Base64.urlsafe_decode64(merchant_user_params[:email])
    merchant_user = MerchantUser.find_by(email: email)
    render json: { errMessage: "不正な検証コードです" }, status: 401 and return if merchant_user.verification_code != merchant_user_params[:verification_code]
    render json: { errMessage: "検証コードの期限が切れています" }, status: 401 and return if merchant_user.verification_code_expired_at < Time.zone.now
    merchant_user.update!(email_authentication_status: 'Enabled', password: merchant_user_params[:password])
    session['merchant_user_id'] = merchant_user.id
    MerchantUserMailer.registration_complete(merchant_user.email).deliver_now
    render json: { status: 'success', session_id: session.id, }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def confirm_update_email_verification_code
    email = Base64.urlsafe_decode64(merchant_user_params[:email])
    merchant_user = MerchantUser.find_by(wait_for_update_email: email)
    render json: { errMessage: "不正な検証コードです" }, status: 401 and return if merchant_user.verification_code != merchant_user_params[:verification_code]
    render json: { errMessage: "検証コードの期限が切れています" }, status: 401 and return if merchant_user.verification_code_expired_at < Time.zone.now
    merchant_user.update!(email: merchant_user.wait_for_update_email)
    session['merchant_user_id'] = merchant_user.id
    render json: { status: 'success', session_id: session.id, }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def current_merchant_user_info
    # なぜかApplicationControllerのcurrent_merchant_userがnilになるので一旦こうする
    session_hash = Rails.cache.fetch('_session_id:2::' + Digest::SHA256.hexdigest(request.headers["Session-Id"]))
    raise "session not exists" if session_hash.blank?
    user = MerchantUser.find(session_hash["merchant_user_id"])
    current_merchant_user = JSON.parse(user.to_json(methods: [:is_enabled_email_login]))
    render json: { status: 'success', merchant_user: current_merchant_user }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def disconnect_google_auth
    current_merchant_user.update!(google_auth_id: nil, google_auth_email: nil)
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def send_reset_password_email
    merchant_user = MerchantUser.find_by(email: merchant_user_params[:email])
    raise '未登録のメールアドレスです' if merchant_user.blank?
    merchant_user.set_email_reset_key
    url = ENV["FRONTEND_URL"] + "/merchant/input_reset_password" + "?key=" + merchant_user.email_reset_key
    MerchantUserMailer.reset_password(merchant_user.email, url).deliver_now
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update_password
    merchant_user = MerchantUser.find_by(email: merchant_user_params[:email])
    raise "未登録のメールアドレスです" if merchant_user.blank?
    merchant_user.password = merchant_user_params[:password]
    merchant_user.save!
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def resend_verification_code
    ActiveRecord::Base.transaction do
      merchant_user = MerchantUser.find_by(email: merchant_user_params[:email])
      encode_email = Base64.urlsafe_encode64(merchant_user.email)
      raise '検証コード確認済みのユーザです。' if merchant_user.email_authentication_status == 'Enabled'
      merchant_user.verification_code = SecureRandom.random_number(10**VERIFICATION_CODE_LENGTH)
      merchant_user.verification_code_expired_at = Time.zone.now + 1.days
      merchant_user.save!
      MerchantUserMailer.send_verification_code(merchant_user.email, encode_email, merchant_user.verification_code).deliver_now
    end
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
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
                                          :google_auth_email,
                                          :key)
  end
end
