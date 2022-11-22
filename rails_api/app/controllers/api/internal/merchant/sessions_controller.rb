class Api::Internal::Merchant::SessionsController < ApplicationController
  def login_status
    raise if current_merchant_user.blank?
    user = JSON.parse(current_merchant_user.to_json(methods: [:stripe_account_enable, :stripe_customer_enable])) 
    render json: { status: 'success',
                   user: user,
                   service_plan: current_merchant_user.account.service_plan }
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: e }, status: 401
  end

  def create
    merchant_user = MerchantUser.find_by(email: merchant_user_params[:email])
    raise "メールアドレスとパスワードが一致しません" unless merchant_user.authenticate(merchant_user_params[:password])
    session['merchant_user_id'] = merchant_user.id
    render json: { status: 'success',
                   session_id: session.id,
                   email: merchant_user.email,
                   merchant_user: merchant_user,
                   error: nil }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 401
  end

  def create_by_google_auth
    raise if merchant_user_params[:google_auth_id].blank?
    merchant_user = MerchantUser.find_by(google_auth_id: merchant_user_params[:google_auth_id])
    session['merchant_user_id'] = merchant_user.id
    render json: { status: 'success',
                   session_id: session.id,
                   email: merchant_user.google_auth_email,
                   merchant_user: merchant_user,
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

  def merchant_user_params
    params.require(:merchant_user).permit(:email, :password, :google_auth_id)
  end
end
