require 'securerandom'

class Api::Internal::EndUsersController < ApplicationController
  before_action :end_user_login_only!, except: [:create,
                                                :find_or_create_by_google_auth,
                                                :confirm_verification_code,
                                                :confirm_update_email_verification_code,
                                                :send_reset_password_email,
                                                :resend_verification_code]

  VERIFICATION_CODE_LENGTH = 6

  def customer_toppage_info
    notifications = current_end_user.end_user_notifications.order(created_at: :desc).limit(5)
    system_notifications = SystemEndUserNotification.order(created_at: :desc).limit(5)
    render json: {  status: 'success',
                    notifications: notifications,
                    system_notifications: system_notifications }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def current_end_user_info
    end_user = current_end_user.attributes.except(:password_digest, :stripe_customer_id)
    render json: { status: 'success', end_user: end_user }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def mypage_info
    end_user = current_end_user.attributes.except(:password_digest, :stripe_customer_id)
    delivery_target = current_end_user.default_delivery_target
    render json: { status: 'success', end_user: end_user, delivery_target: delivery_target }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
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
                   default_payment_method_id: default_payment_method_id }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
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
      EndUserMailer.send_verification_code(end_user.email, encode_email, end_user.verification_code).deliver_now
    end
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update
    ActiveRecord::Base.transaction do
      end_user = EndUser.find_by(public_id: params[:public_id])
      init_email = end_user.email
      end_user.attributes = end_user_params.except(:password)
      end_user.password = end_user_params[:password] if end_user_params[:password].present?
      # メールアドレス変更/追加時
      if end_user_params[:email].present? && init_email != end_user_params[:email]
        end_user.wait_for_update_email = end_user_params[:email]
        end_user.verification_code = SecureRandom.random_number(10**VERIFICATION_CODE_LENGTH)
        end_user.verification_code_expired_at = Time.zone.now + 1.days
        encode_email = Base64.urlsafe_encode64(end_user.wait_for_update_email)
        EndUserMailer.send_update_email_verification_code(end_user.wait_for_update_email, encode_email, end_user.verification_code).deliver_now
      end
      end_user.save!
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
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
          raise 'ユーザが見つかりません' unless end_user_params[:google_end_user_auth_type] == 'signup'
          end_user = EndUser.new
          end_user.google_auth_email = end_user_params[:google_auth_email]
          end_user.google_auth_id = end_user_params[:google_auth_id]
          end_user.save!
        end
      end
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def confirm_verification_code
    email = Base64.urlsafe_decode64(end_user_params[:email])
    end_user = EndUser.find_by(email: email)
    render json: { errMessage: "不正な検証コードです" }, status: 401 and return if end_user.verification_code != end_user_params[:verification_code]
    render json: { errMessage: "検証コードの期限が切れています" }, status: 401 and return if end_user.verification_code_expired_at < Time.zone.now
    end_user.update!(email_authentication_status: 'Enabled')
    session['end_user_id'] = end_user.id
    EndUserMailer.registration_complete(end_user.id).deliver_now
    render json: { status: 'success', session_id: session.id, }, status: 200
  rescue => error
    render json: { status: 'fail', error: error }, status: 500
  end

  def confirm_update_email_verification_code
    email = Base64.urlsafe_decode64(end_user_params[:email])
    end_user = EndUser.find_by(wait_for_update_email: email)
    render json: { errMessage: "不正な検証コードです" }, status: 401 and return if end_user.verification_code != end_user_params[:verification_code]
    render json: { errMessage: "検証コードの期限が切れています" }, status: 401 and return if end_user.verification_code_expired_at < Time.zone.now
    end_user.update!(email: end_user.wait_for_update_email)
    session['end_user_id'] = end_user.id
    render json: { status: 'success', session_id: session.id, }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def register_credit_card
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
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
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update_payment_method
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
    Stripe::Customer.update(
      current_end_user.stripe_customer_id,
      {invoice_settings: {default_payment_method: params[:payment_method_id]}},
    )
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def detach_stripe_payment_method
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
    Stripe::PaymentMethod.detach(
      params[:payment_method_id],
    )
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def disconnect_google_auth
    current_end_user.update!(google_auth_id: nil, google_auth_email: nil)
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def stripe_payment_history
    stripe_payment_intents = current_end_user.stripe_payment_intents.order(created_at: :desc)
    stripe_payment_intents = JSON.parse(stripe_payment_intents.to_json(methods: [:account_business_name, :purchase_product_name]))
    render json: { status: 'success', stripe_payment_intents: stripe_payment_intents }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def subscription_lists
    subscriptions = JSON.parse(current_end_user.merchant_stripe_subscriptions.where(canceled_at: nil).to_json(methods: [:monthly_payment_plan_name, :account_business_name]))
    render json: { status: 'success', subscriptions: subscriptions }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def send_reset_password_email
    end_user = EndUser.find_by(email: end_user_params[:email])
    raise '未登録のメールアドレスです' if end_user.blank?
    end_user.set_email_reset_key
    url = ENV["FRONTEND_URL"] + "/customer/input_reset_password" + "?key=" + end_user.email_reset_key
    EndUserMailer.reset_password(end_user.email, url).deliver_now
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update_password
    end_user = EndUser.find_by(email: end_user_params[:email])
    raise "未登録のメールアドレスです" if end_user.blank?
    raise "不正な操作です" if end_user.email_reset_key != end_user_params[:key]
    end_user.password = end_user_params[:password]
    end_user.save!
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def resend_verification_code
    ActiveRecord::Base.transaction do
      end_user = EndUser.find_by(email: end_user_params[:email])
      encode_email = Base64.urlsafe_encode64(end_user.email)
      raise '検証コード確認済みのユーザです。' if end_user.email_authentication_status == 'Enabled'
      end_user.verification_code = SecureRandom.random_number(10**VERIFICATION_CODE_LENGTH)
      end_user.verification_code_expired_at = Time.zone.now + 1.days
      end_user.save!
      EndUserMailer.send_verification_code(end_user.email, encode_email, end_user.verification_code).deliver_now
    end
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def cancel_subscription
    ActiveRecord::Base.transaction do
      merchant_stripe_subscription = MerchantStripeSubscription.find_by(public_id: params[:public_id])
      Stripe::Subscription.cancel(
        merchant_stripe_subscription.stripe_subscription_id,
        prorate: true
      )
      merchant_stripe_subscription.update!(canceled_at: Time.zone.now)
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
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
                                     :google_end_user_auth_type,
                                     :last_name,
                                     :first_name,
                                     :last_name_kana,
                                     :first_name_kana,
                                     :key)
  end
end
