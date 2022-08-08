require 'securerandom'

class Api::Internal::EndUsersController < ApplicationController
  before_action :end_user_login_only!, only: [:current_end_user_info,
                                              :register_credit_card,
                                              :update_payment_method,
                                              :detach_stripe_payment_method,
                                              :disconnect_google_auth]

  VERIFICATION_CODE_LENGTH = 6

  def customer_toppage_info
    system_notifications = EndUserNotification.limit(5)
    render json: { status: 'success', system_notifications: system_notifications }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def current_end_user_info
    end_user = current_end_user.attributes.except(:password_digest, :stripe_customer_id)
    render json: { status: 'success', end_user: end_user }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def payment_methods
    if current_end_user.stripe_customer_id.present?
      default_payment_method_id, payment_methods = current_end_user.payment_methods
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

  # 仮登録して検証コード送信
  # 同じメールアドレスのユーザが存在していればパスワード上書きして再送信
  def create
    ActiveRecord::Base.transaction do
      end_user = EndUser.new(end_user_params)
      end_user.email_authentication_status = 'Disabled'
      end_user.verification_code = SecureRandom.random_number(10**VERIFICATION_CODE_LENGTH)
      end_user.verification_code_expired_at = Time.zone.now + 1.days
      end_user.password = end_user_params[:password]
      end_user.save!
      encode_email = Base64.urlsafe_encode64(end_user.email)
      EndUserMailer.send_verification_code(end_user.email, encode_email, end_user.verification_code).deliver_later
    end
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update
    ActiveRecord::Base.transaction do
      end_user = EndUser.find(params[:id])
      init_email = end_user.email
      end_user.attributes = end_user_params.except(:password)
      end_user.password = end_user_params[:password] if end_user_params[:password].present?
      # メールアドレス変更/追加時
      if end_user_params[:email].present? && init_email != end_user_params[:email]
        end_user.wait_for_update_email = end_user_params[:email]
        end_user.verification_code = SecureRandom.random_number(10**VERIFICATION_CODE_LENGTH)
        end_user.verification_code_expired_at = Time.zone.now + 1.days
        encode_email = Base64.urlsafe_encode64(end_user.wait_for_update_email)
        EndUserMailer.send_update_email_verification_code(end_user.wait_for_update_email, encode_email, end_user.verification_code).deliver_later
      end
      end_user.save!
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end


  def find_or_create_by_google_auth
    ActiveRecord::Base.transaction do
      if current_end_user.present?
        # current_user直接更新できないので別の変数を作る
        end_user = EndUser.find(current_end_user.id)
        end_user.google_auth_email = end_user_params[:google_auth_email]
        end_user.google_auth_id = end_user_params[:google_auth_id]
        end_user.save!
      else
        end_user = EndUser.find_by(google_auth_id: end_user_params[:google_auth_id])
        if end_user.blank?
          end_user = EndUser.new
          end_user.google_auth_email = end_user_params[:google_auth_email]
          end_user.google_auth_id = end_user_params[:google_auth_id]
          end_user.save!
        end
      end
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def confirm_verification_code
    email = Base64.urlsafe_decode64(end_user_params[:email])
    end_user = EndUser.find_by(email: email)
    render json: { errMessage: "不正な検証コードです" }, status: 401 and return if end_user.verification_code != end_user_params[:verification_code]
    render json: { errMessage: "検証コードの期限が切れています" }, status: 401 and return if end_user.verification_code_expired_at < Time.zone.now
    end_user.update!(email_authentication_status: 'Enabled')
    session['end_user_id'] = end_user.id
    render json: { status: 'success', session_id: session.id, }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def confirm_update_email_verification_code
    email = Base64.urlsafe_decode64(end_user_params[:email])
    end_user = EndUser.find_by(wait_for_update_email: email)
    render json: { errMessage: "不正な検証コードです" }, status: 401 and return if end_user.verification_code != end_user_params[:verification_code]
    render json: { errMessage: "検証コードの期限が切れています" }, status: 401 and return if end_user.verification_code_expired_at < Time.zone.now
    end_user.update!(email: end_user.wait_for_update_email)
    session['end_user_id'] = end_user.id
    render json: { status: 'success', session_id: session.id, }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def register_credit_card
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    ActiveRecord::Base.transaction do
      if current_end_user.stripe_customer_id.blank?
        customer = Stripe::Customer.create({
          source: end_user_params[:card_token],
          email: current_end_user.email,
        })
        current_end_user.update!(stripe_customer_id: customer.id)
        Stripe::PaymentMethod.attach(
          end_user_params[:payment_method_id],
          {customer: current_end_user.stripe_customer_id},
        )
        Stripe::Customer.update(
          current_end_user.stripe_customer_id,
          invoice_settings: {
            default_payment_method: end_user_params[:payment_method_id],
          },
        )
      else
        Stripe::PaymentMethod.attach(
          end_user_params[:payment_method_id],
          {customer: current_end_user.stripe_customer_id},
        )
      end
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update_payment_method
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe::Customer.update(
      current_end_user.stripe_customer_id,
      {invoice_settings: {default_payment_method: params[:payment_method_id]}},
    )
  end

  def detach_stripe_payment_method
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe::PaymentMethod.detach(
      params[:payment_method_id],
    )
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def disconnect_google_auth
    current_end_user.update!(google_auth_id: nil, google_auth_email: nil)
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def stripe_payment_history
    stripe_payment_intents = current_end_user.search_stripe_payment_intents
    render json: { status: 'success', stripe_payment_intents: stripe_payment_intents }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def subscription_lists
    stripe_payment_subscriptions = current_end_user.search_stripe_subscriptions
    render json: { status: 'success', stripe_payment_subscriptions: stripe_payment_subscriptions }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def end_user_params
    params.require(:end_user).permit(:id,
                                     :email,
                                     :password,
                                     :password_confirmation,
                                     :verification_code,
                                     :card_token,
                                     :token,
                                     :payment_method_id,
                                     :google_auth_id,
                                     :google_auth_email,
                                     :last_name,
                                     :first_name,
                                     :last_name_kana,
                                     :first_name_kana,)
  end
end
