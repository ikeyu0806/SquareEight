require 'securerandom'

class Api::Internal::EndUsersController < ApplicationController
  VERIFICATION_CODE_LENGTH = 6
  # 仮登録して検証コード送信
  # 同じメールアドレスのユーザが存在していればパスワード上書きして再送信
  def payment_methods
    if current_end_user.stripe_customer_id.present?
      customer = Stripe::Customer.retrieve(current_end_user.stripe_customer_id)
      default_payment_method_id = customer["invoice_settings"]["default_payment_method"]
      payment_methods = Stripe::Customer.list_payment_methods(
        current_end_user.stripe_customer_id,
        {type: 'card'},
      )
      payment_methods = payment_methods["data"].map{ |data| JSON.parse(data.to_json) }
    else
      default_payment_method_id = nil
      payment_methods = []
    end
    render json: { status: 'success',
                   payment_methods: payment_methods,
                   default_payment_method_id: default_payment_method_id }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    ActiveRecord::Base.transaction do
      end_user = EndUser.new(end_user_params)
      end_user.authentication_status = 'Disabled'
      end_user.verification_code = SecureRandom.random_number(10**VERIFICATION_CODE_LENGTH)
      end_user.verification_code_expired_at = Time.zone.now + 1.hours
      end_user.password = end_user_params[:password]
      end_user.save!
      encode_email = Base64.urlsafe_encode64(end_user.email)
      EndUserMailer.send_verification_code(end_user.email, encode_email, end_user.verification_code).deliver_later
    end
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def confirm_verification_code
    email = Base64.urlsafe_decode64(end_user_params[:email])
    end_user = EndUser.find_by(email: email)
    render json: { errMessage: "不正な検証コードです" }, status: 401 and return if end_user.verification_code != end_user_params[:verification_code]
    render json: { errMessage: "検証コードの期限が切れています" }, status: 401 and return if end_user.verification_code_expired_at < Time.zone.now
    end_user.update!(authentication_status: 'Enabled')
    session['end_user_id'] = end_user.id
    render json: { status: 'success', session_id: session.id, }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def end_user_params
    params.require(:end_user).permit(:id,
                                     :email,
                                     :password,
                                     :password_confirmation,
                                     :verification_code)
  end
end
