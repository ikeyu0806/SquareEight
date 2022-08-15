class Api::Internal::AccountsController < ApplicationController
  before_action :merchant_login_only!

  def dashboard_contents
    system_notifications = SystemAccountNotification.limit(5)
    render json: { status: 'success', system_notifications: system_notifications }
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def payment_methods
    default_payment_method_id, payment_methods = current_merchant_user.account.payment_methods
    render json: { status: 'success',
                   payment_methods: payment_methods,
                   default_payment_method_id: default_payment_method_id }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def stripe_connected_account
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    stripe_account = Stripe::Account.retrieve(current_merchant_user.account.stripe_account_id)
    render json: { status: 'success',
                   stripe_account: JSON.parse(stripe_account.to_json),
                   selected_external_account_id: current_merchant_user.account.selected_external_account_id }, states: 200
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
          email: account.merchant_users.first.email,
          name: account.business_name
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
    Stripe.api_version = '2022-08-01'
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
      current_merchant_user.account.update!(stripe_account_id: stripe_account.id)
    else
      stripe_account = Stripe::Account.retrieve(current_merchant_user.account.stripe_account_id)
      stripe_account.save
    end

    if account_params[:business_type] == "individual"
      stripe_account.business_type = "individual"
      stripe_account.mcc = '5734'
      stripe_account.business_profile.name = account_params[:business_profile_name]
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
      stripe_account.legal_entity.personal_email = account_params[:individual_email]
      if account_params[:individual_phone_number].start_with?("+81")
        stripe_account.legal_entity.phone_number = account_params[:individual_phone_number]
        stripe_account.legal_entity.personal_phone_number = account_params[:individual_phone_number]
      else
        stripe_account.legal_entity.phone_number = '+81' + account_params[:individual_phone_number]
        stripe_account.legal_entity.personal_phone_number = '+81' + account_params[:individual_phone_number]
      end
      stripe_account.business_url = account_params[:individual_business_url]
      stripe_account.product_description = account_params[:individual_product_description]
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
    elsif account_params[:business_type] == "company"
      stripe_account.business_type = "company"
      stripe_account.save
      stripe_account.business_profile.mcc = '5734'
      stripe_account.business_profile.url = account_params[:company_business_url]
      stripe_account.business_profile.product_description = account_params[:company_description]
      stripe_account.company.name = account_params[:business_profile_name]
      stripe_account.company.name_kanji = account_params[:business_profile_name]
      stripe_account.company.name_kana = account_params[:company_business_name_kana] if account_params[:company_business_name_kana].present?
      stripe_account.company.tax_id = account_params[:company_business_tax_id]
      stripe_account.company.address_kanji.postal_code = account_params[:company_portal_code]
      stripe_account.company.address_kanji.state = account_params[:company_state_kanji]
      stripe_account.company.address_kanji.city = account_params[:company_city_kanji]
      stripe_account.company.address_kanji.town = account_params[:company_town_kanji]
      stripe_account.company.address_kanji.line1 = account_params[:company_line1_kanji]
      stripe_account.company.address_kanji.line2 = account_params[:company_line2_kanji] if account_params[:company_line2_kanji].present?
      stripe_account.company.address_kana.postal_code = account_params[:company_portal_code]
      stripe_account.company.address_kana.state = account_params[:company_state_kana] if account_params[:company_state_kana].present?
      stripe_account.company.address_kana.city = account_params[:company_city_kana] if account_params[:company_city_kana].present?
      stripe_account.company.address_kana.town = account_params[:company_town_kana] if account_params[:company_town_kana].present?
      stripe_account.company.address_kana.line1 = account_params[:company_line1_kana]if account_params[:company_line1_kana].present?
      stripe_account.company.address_kana.line2 = account_params[:company_line2_kana] if account_params[:company_line2_kana].present?

      if account_params[:company_phone_number].start_with?("+81")
        stripe_account.company.phone = account_params[:company_phone_number]
      else
        stripe_account.company.phone = '+81' + account_params[:company_phone_number]
      end
      stripe_account.tos_acceptance.date = Time.now.to_i
      stripe_account.tos_acceptance.ip = request.remote_ip

      stripe_account.save
      if current_merchant_user.account.stripe_representative_person_id.present?
        person = Stripe::Account.retrieve_person(
          current_merchant_user.account.stripe_account_id,
          current_merchant_user.account.stripe_representative_person_id
        )
      else
        person = Stripe::Account.create_person(
          stripe_account.id
        )
        person.relationship.representative = true
        person.relationship.title = 'CEO'
        current_merchant_user.account.update!(stripe_representative_person_id: person.id)
      end
      person.first_name_kanji = account_params[:representative_first_name_kanji]
      person.last_name_kanji = account_params[:representative_last_name_kanji]
      person.first_name_kana = account_params[:representative_first_name_kana] if account_params[:representative_first_name_kana].present?
      person.last_name_kana = account_params[:representative_last_name_kana] if account_params[:representative_last_name_kana].present?
      person.email = account_params[:representative_email]
      if account_params[:representative_phone_number].start_with?("+81")
        stripe_account.company.phone = account_params[:representative_phone_number]
      else
        stripe_account.company.phone = '+81' + account_params[:representative_phone_number]
      end
      split_birth_date = account_params[:representative_birth_day].split("-")
      person.dob.year = split_birth_date[0]
      person.dob.month = split_birth_date[1]
      person.dob.day = split_birth_date[2]
      person.gender = account_params[:representative_gender]
      person.save
      person.address_kanji.postal_code = account_params[:representative_address_postal_code]
      person.address_kanji.state = account_params[:representative_address_state_kanji]
      person.address_kanji.city = account_params[:representative_address_city_kanji]
      person.address_kanji.town = account_params[:representative_address_town_kanji]
      person.address_kanji.line1 = account_params[:representative_address_line1_kanji]
      person.address_kanji.line2 = account_params[:representative_address_line2_kanji] if account_params[:representative_address_line2_kanji].present?
      person.address_kanji.postal_code = account_params[:representative_address_postal_code]
      # 本人確認ドキュメント
      # image_data = account_params[:identification_image].gsub(/^data:\w+\/\w+;base64,/, "")
      # decode_image = Base64.decode64(image_data)
      # extension = account_params[:identification_image].split("/")[1].split(";")[0]
      # content_type = account_params[:identification_image].split(":")[1].split(";")[0]
      # obj_name =  "identification_image" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N') + "." + extension
  
      # File.open(obj_name, 'wb') do |file|
      #   file.write(decode_image)
      # end
      # identification_image_file = File.open(obj_name, "r")
      # verification_document = Stripe::File.create(
      #   {
      #     purpose: 'identity_document',
      #     file: identification_image_file
      #   },
      #   {
      #     stripe_account: stripe_account.id
      #   }
      # )
      # person.document = verification_document
      person.save
    end
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def register_stripe_bank_account
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    external_account = Stripe::Account.create_external_account(
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
    if current_merchant_user.account.selected_external_account_id.blank?
      current_merchant_user.account.update!(selected_external_account_id: external_account.id)
    end
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update_selected_bank_account
    current_merchant_user.account.update!(selected_external_account_id: account_params[:external_account_id])
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def delete_bank_account
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe::Account.delete_external_account(
      current_merchant_user.account.stripe_account_id,
      params[:external_account_id],
    )
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def reserve_events
    events = current_merchant_user.account.reserve_calendar_json
    render json: { status: 'success', events: events }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def page_links
    account = current_merchant_user.account
    page_links = account.page_links
    render json: { status: 'success', page_links: page_links }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update_payment_method
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe::Customer.update(
      current_merchant_user.account.stripe_customer_id,
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

  def stripe_account_info
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
    stripe_account_id = current_merchant_user.account.stripe_account_id
    if stripe_account_id.present?
      stripe_account = JSON.parse(Stripe::Account.retrieve(stripe_account_id).to_json)
      stripe_persons = JSON.parse(Stripe::Account.list_persons('acct_1LVs6c2c71M0ULtv',{limit: 100},).to_json)["data"]
      representative = stripe_persons.select{|person| person["relationship"]["representative"] == true}[0]
    else
      stripe_account = {}
      representative = {}
    end
    render json: { status: 'success', stripe_account: stripe_account, representative: representative }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def account_params
    params.require(:account)
          .permit(:id,
                  :token,
                  :payment_method_id,
                  :business_profile_name,
                  :business_type,
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
                  :individual_email,
                  :individual_business_url,
                  :individual_product_description,
                  :company_business_name,
                  :company_business_tax_id,
                  :company_business_name_kana,
                  :company_registration_number,
                  :company_portal_code,
                  :company_state_kanji,
                  :company_city_kanji,
                  :company_town_kanji,
                  :company_line1_kanji,
                  :company_line2_kanji,
                  :company_state_kana,
                  :company_city_kana,
                  :company_town_kana,
                  :company_line1_kana,
                  :company_line2_kana,
                  :company_phone_number,
                  :company_business_url,
                  :company_description,
                  :identification_image,
                  :representative_last_name_kanji,
                  :representative_first_name_kanji,
                  :representative_last_name_kana,
                  :representative_first_name_kana,
                  :representative_email,
                  :representative_phone_number,
                  :representative_birth_day,
                  :representative_gender,
                  :representative_address_postal_code,
                  :representative_address_state_kanji,
                  :representative_address_city_kanji,
                  :representative_address_town_kanji,
                  :representative_address_line1_kanji,
                  :representative_address_line2_kanji,
                  :account_number,
                  :bank_code,
                  :branch_code,
                  :account_holder_name,
                  :external_account_id)
  end
end
