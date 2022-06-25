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
        capabilities: {
          card_payments: {requested: true},
          transfers: {requested: true},
        },
      })
    else
      stripe_account = Stripe::Account.retrieve(current_merchant_user.account.stripe_account_id)
    end
    stripe_account.legal_entity.type = "individual"
    stripe_account.last_name_kana = account_params[:last_name_kana]
    stripe_account.last_name_kanji = account_params[:last_name_kanji]
    stripe_account.last_name_kana = account_params[:individual_last_name_kana]
    stripe_account.portal_code_kanji = account_params[:individual_portal_code_kanji]
    stripe_account.state_kanji = account_params[:individual_state_kanji]
    stripe_account.city_kanji = account_params[:individual_city_kanji]
    stripe_account.town_kanji = account_params[:individual_town_kanji]
    stripe_account.line1_kanji = account_params[:individual_line1_kanji]
    stripe_account.line2_kanji = account_params[:individual_line2_kanji]
    stripe_account.state_kana = account_params[:individual_state_kana]
    stripe_account.town_kana = account_params[:individual_town_kana]
    stripe_account.city_kana = account_params[:individual_city_kana]
    stripe_account.line1_kana = account_params[:individual_line1_kana]
    stripe_account.line2_kana = account_params[:individual_line2_kana]
    stripe_account.phone_number = account_params[:indiphone_number]
    split_birth_date = account_params["individual_birth_day"].split("-")
    stripe_account.year = split_birth_date[0]
    stripe_account.month = split_birth_date[1]
    stripe_account.day = split_birth_date[2]
    stripe_account.save
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
                  :individual_last_name_kanji,
                  :individual_last_name_kana,
                  :individual_portal_code_kanji,
                  :individual_state_kanji,
                  :individual_city_kanji,
                  :individual_town_kanji,
                  :individual_line1_kanji,
                  :individual_line2_kanji,
                  :individual_state_kana,
                  :individual_town_kana,
                  :individual_city_kana,
                  :individual_line1_kana,
                  :individual_line2_kana,
                  :individual_phone_number,
                  :individual_birth_day)
  end
end
