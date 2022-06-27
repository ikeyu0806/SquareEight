class Api::Internal::AccountsController < ApplicationController
  before_action :login_only!

  def payment_methods
    customer = Stripe::Customer.retrieve(current_merchant_user.account.stripe_customer_id)
    default_payment_method_id = customer["invoice_settings"]["default_payment_method"]
    payment_methods = Stripe::Customer.list_payment_methods(
      current_merchant_user.account.stripe_customer_id,
      {type: 'card'},
    )
    payment_methods = payment_methods["data"].map{ |data| JSON.parse(data.to_json) }
    render json: { status: 'success',
                   payment_methods: payment_methods,
                   default_payment_method_id: default_payment_method_id }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def register_credit_card
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    ActiveRecord::Base.transaction do
      account = current_merchant_user.account
      if account.stripe_customer_id.blank?
        customer = Stripe::Customer.create({
          source: account_params[:card_token],
        })
        account.update!(stripe_customer_id: customer.id)
        Stripe::PaymentMethod.attach(
          account_params[:payment_method_id],
          {customer: account.stripe_customer_id},
        )
        Stripe::Customer.update(
          account.stripe_customer_id,
          invoice_settings: {
            default_payment_method: account_params[:payment_method_id],
          },
        )
      else
        Stripe::PaymentMethod.attach(
          account_params[:payment_method_id],
          {customer: account.stripe_customer_id},
        )
      end
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def register_stripe_business_info
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    if current_merchant_user.account.stripe_account_id.blank?
      stripe_account = Stripe::Account.create({
        type: 'custom',
        country: 'JP',
        email: current_merchant_user.email,
        capabilities: {
          card_payments: {requested: true},
          transfers: {requested: true},
        },
      })
    else
      stripe_account = Stripe::Account.retrieve(current_merchant_user.account.stripe_account_id)
    end
    stripe_account.legal_entity.type = "individual"
    stripe_account.legal_entity.last_name_kanji = account_params[:individual_last_name_kanji]
    stripe_account.legal_entity.last_name_kana = account_params[:individual_last_name_kana]
    stripe_account.legal_entity.first_name_kanji = account_params[:individual_first_name_kanji]
    stripe_account.legal_entity.first_name_kana = account_params[:individual_first_name_kana]
    stripe_account.legal_entity.address_kanji.postal_code = account_params[:individual_postal_code_kanji]
    stripe_account.legal_entity.address_kanji.state = account_params[:individual_state_kanji]
    stripe_account.legal_entity.address_kanji.city = account_params[:individual_city_kanji]
    stripe_account.legal_entity.address_kanji.town = account_params[:individual_town_kanji]
    stripe_account.legal_entity.address_kanji.line1 = account_params[:individual_line1_kanji]
    stripe_account.legal_entity.address_kanji.line2 = account_params[:individual_line2_kanji] if account_params[:individual_line2_kanji].present?
    stripe_account.legal_entity.address_kana.postal_code = account_params[:individual_postal_code_kanji]
    stripe_account.legal_entity.address_kana.state = account_params[:individual_state_kana]
    stripe_account.legal_entity.address_kana.city = account_params[:individual_city_kana]
    stripe_account.legal_entity.address_kana.town = account_params[:individual_town_kana]
    stripe_account.legal_entity.address_kana.line1 = account_params[:individual_line1_kana]
    stripe_account.legal_entity.address_kana.line2 = account_params[:individual_line2_kana] if account_params[:individual_line2_kana].present?
    stripe_account.legal_entity.phone_number = account_params[:individual_phone_number]
    stripe_account.legal_entity.gender = account_params[:individual_gender]
    split_birth_date = account_params["individual_birth_day"].split("-")
    stripe_account.legal_entity.dob.year = split_birth_date[0]
    stripe_account.legal_entity.dob.month = split_birth_date[1]
    stripe_account.legal_entity.dob.day = split_birth_date[2]
    stripe_account.tos_acceptance.date = Time.now.to_i
    stripe_account.tos_acceptance.ip = request.remote_ip

    image_data = account_params[:identification_image].gsub(/^data:\w+\/\w+;base64,/, "")
    decode_image = Base64.decode64(image_data)
    extension = account_params[:identification_image].split("/")[1].split(";")[0]
    content_type = account_params[:identification_image].split(":")[1].split(";")[0]
    obj_name =  "identification_image" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N') + "." + extension

    File.open(obj_name, 'wb') do |file|
      file.write(decode_image)
    end
    identification_image_file = File.open(obj_name, "r")
    verification_document = Stripe::File.create(
      {
        purpose: 'identity_document',
        file: identification_image_file
      },
      {
        stripe_account: stripe_account.id
      }
    )

    stripe_account.legal_entity.verification.document = verification_document.id
    stripe_account.save
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def register_stripe_bank_account
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe::Account.create_external_account(
      current_merchant_user.account.stripe_account_id,
      {
        external_account: {
          object: 'bank_account',
          account_number: account_params[:account_number],
          routing_number: account_params[:bank_code] + account_params[:branch_code],
          account_holder_name: account_params[:account_holder_name],
          currency:'jpy',
          country:'jp',
        },
      },
    )
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def account_params
    params.require(:account)
          .permit(:id,
                  :token,
                  :payment_method_id,
                  :individual_first_name_kanji,
                  :individual_first_name_kana,
                  :individual_last_name_kanji,
                  :individual_last_name_kana,
                  :individual_postal_code_kanji,
                  :individual_state_kanji,
                  :individual_city_kanji,
                  :individual_town_kanji,
                  :individual_line1_kanji,
                  :individual_line2_kanji,
                  :individual_postal_code_kana,
                  :individual_state_kana,
                  :individual_town_kana,
                  :individual_city_kana,
                  :individual_line1_kana,
                  :individual_line2_kana,
                  :individual_phone_number,
                  :individual_birth_day,
                  :individual_gender,
                  :identification_image,
                  :account_number,
                  :bank_code,
                  :branch_code,
                  :account_holder_name)
  end
end
