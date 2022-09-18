class Api::Internal::AccountsController < ApplicationController
  before_action :merchant_login_only!

  def dashboard_contents
    account = current_merchant_user.account
    # 通知
    notifications = account.account_notifications.order(created_at: :desc).limit(5)
    system_notifications = SystemAccountNotification.order(created_at: :desc).limit(5)

    # グラフのラベル
    week_days =  (0..6).to_a.map{|i| (Time.now - i.days).strftime("%Y/%m/%d")}.reverse
    # 顧客数グラフ
    customers = account.customers.where(created_at: 1.week.ago.beginning_of_day..Time.zone.now.end_of_day)
    if customers.present?
      group_by_customers_count = customers.map{|customer| customer.created_at.strftime("%Y/%m/%d")}.group_by(&:itself).transform_values(&:size)
      customer_count_array = week_days.map do |day|
        group_by_customers_count[day].present? ? group_by_customers_count[day] : 0
      end
      # 新規顧客が0の日付を埋めて一週間以前の顧客総数を足し込む
      customer_count_array = customer_count_array.each_with_index do |a, i|
        if i > 0
          customer_count_array[i] = customer_count_array[i] + customer_count_array[i - 1]
        else
          customer_count_array[i] = customer_count_array[i] + account.customers.where("created_at <= ?", 1.week.ago ).count
        end
      end
    else
      customer_count_array = []
    end
    # 売上グラフ
    payment_intents = account.stripe_payment_intents
    payment_intent_content = payment_intents.map{|c| {charge_date: Time.at(c["created_at"]).strftime("%Y/%m/%d"), amount: c["amount"], application_fee_amount: c["application_fee_amount"]}}
    payment_intent_content = payment_intent_content.group_by{|c| c[:charge_date]}
    payment_intent_content = payment_intent_content.map do |g|
      { date: g[0],
        amount: (g[1].pluck(:amount).sum) - (g[1].pluck(:application_fee_amount).sum),
        application_fee_amount: g[1].pluck(:application_fee_amount).sum }
    end
    transfer_amount_array = week_days.map do |day|
      payment_intent_content.find{|content| content[:date] === day}.present? ? payment_intent_content.find{|content| content[:date] === day}[:amount] : 0
    end
    fee_amount_array = week_days.map do |day|
      payment_intent_content.find{|content| content[:date] === day}.present? ? payment_intent_content.find{|content| content[:date] === day}[:application_fee_amount] : 0
    end
    fee_amount = []
    render json: { status: 'success',
                   week_days: week_days,
                   transfer_amount_array: transfer_amount_array,
                   fee_amount_array: fee_amount_array,
                   notifications: notifications,
                   customer_count_array: customer_count_array,
                   system_notifications: system_notifications }
  rescue => error
    render json: { status: 'fail', error: error }, status: 500
  end

  def payment_methods
    default_payment_method_id, payment_methods = current_merchant_user.account.payment_methods
    render json: { status: 'success',
                   payment_methods: payment_methods,
                   default_payment_method_id: default_payment_method_id }, states: 200
  rescue => error
    render json: { status: 'fail', error: error }, status: 500
  end

  def stripe_connected_account
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    stripe_account = Stripe::Account.retrieve(current_merchant_user.account.stripe_account_id)
    if current_merchant_user.account.stripe_representative_person_id.present?
      representative_person = Stripe::Account.retrieve_person(
        current_merchant_user.account.stripe_account_id,
        current_merchant_user.account.stripe_representative_person_id
      )
    else
      representative_person = {}
    end
    render json: { status: 'success',
                   stripe_account: JSON.parse(stripe_account.to_json),
                   representative_person: JSON.parse(representative_person.to_json),
                   selected_external_account_id: current_merchant_user.account.selected_external_account_id }, states: 200
  rescue => error
    render json: { status: 'fail', error: error }, status: 500
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
    render json: { status: 'fail', error: error }, status: 500
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
  
      image_data = account_params[:individual_identification_image].gsub(/^data:\w+\/\w+;base64,/, "")
      decode_image = Base64.decode64(image_data)
      extension = account_params[:individual_identification_image].split("/")[1].split(";")[0]
      content_type = account_params[:individual_identification_image].split(":")[1].split(";")[0]
      obj_name =  "individual_identification_image" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N') + "." + extension
  
      File.open(obj_name, 'wb') do |file|
        file.write(decode_image)
      end
      individual_identification_image_file = File.open(obj_name, "r")
      verification_document = Stripe::File.create(
        {
          purpose: 'identity_document',
          file: individual_identification_image_file
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
      stripe_account.company.address_kanji.postal_code = account_params[:company_postal_code]
      stripe_account.company.address_kanji.state = account_params[:company_state_kanji]
      stripe_account.company.address_kanji.city = account_params[:company_city_kanji]
      stripe_account.company.address_kanji.town = account_params[:company_town_kanji]
      stripe_account.company.address_kanji.line1 = account_params[:company_line1_kanji]
      stripe_account.company.address_kanji.line2 = account_params[:company_line2_kanji] if account_params[:company_line2_kanji].present?
      stripe_account.company.address_kana.postal_code = account_params[:company_postal_code]
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

      if account_params[:is_director_register_complete] == true
        stripe_account.company.directors_provided = true
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
      person.save
      person.first_name_kanji = account_params[:representative_first_name_kanji]
      person.last_name_kanji = account_params[:representative_last_name_kanji]
      person.first_name_kana = account_params[:representative_first_name_kana] if account_params[:representative_first_name_kana].present?
      person.last_name_kana = account_params[:representative_last_name_kana] if account_params[:representative_last_name_kana].present?
      person.email = account_params[:representative_email]
      split_birth_date = account_params[:representative_birth_day].split("-")
      person.dob.year = split_birth_date[0]
      person.dob.month = split_birth_date[1]
      person.dob.day = split_birth_date[2]
      person.gender = account_params[:representative_gender]
      if account_params[:representative_phone_number].start_with?("+81")
        person.phone = account_params[:representative_phone_number]
      else
        person.phone = '+81' + account_params[:representative_phone_number]
      end
      person.address_kanji.postal_code = account_params[:representative_address_postal_code]
      person.address_kanji.state = account_params[:representative_address_state_kanji]
      person.address_kanji.city = account_params[:representative_address_city_kanji]
      person.address_kanji.town = account_params[:representative_address_town_kanji]
      person.address_kanji.line1 = account_params[:representative_address_line1_kanji]
      person.address_kanji.line2 = account_params[:representative_address_line2_kanji] if account_params[:representative_address_line2_kanji].present?

      person.address_kana.postal_code = account_params[:representative_address_postal_code]
      person.address_kana.state = account_params[:representative_address_state_kana]
      person.address_kana.city = account_params[:representative_address_city_kana]
      person.address_kana.town = account_params[:representative_address_town_kana]
      person.address_kana.line1 = account_params[:representative_address_line1_kana]
      person.address_kana.line2 = account_params[:representative_address_line2_kana] if account_params[:representative_address_line2_kana].present?

      # 本人確認ドキュメント
      image_data = account_params[:representative_identification_image].gsub(/^data:\w+\/\w+;base64,/, "")
      decode_image = Base64.decode64(image_data)
      extension = account_params[:representative_identification_image].split("/")[1].split(";")[0]
      content_type = account_params[:representative_identification_image].split(":")[1].split(";")[0]
      obj_name =  "representative_identification_image" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N') + "." + extension
  
      File.open(obj_name, 'wb') do |file|
        file.write(decode_image)
      end
      representative_identification_image_file = File.open(obj_name, "r")
      verification_document = Stripe::File.create(
        {
          purpose: 'identity_document',
          file: representative_identification_image_file
        },
        {
          stripe_account: stripe_account.id
        }
      )
      person.verification.document = verification_document
      person.save
    end
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { status: 'fail', error: error }, status: 500
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
    render json: { status: 'fail', error: error }, status: 500
  end

  def update_selected_bank_account
    current_merchant_user.account.update!(selected_external_account_id: account_params[:external_account_id])
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { status: 'fail', error: error }, status: 500
  end

  def delete_bank_account
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe::Account.delete_external_account(
      current_merchant_user.account.stripe_account_id,
      params[:external_account_id],
    )
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { status: 'fail', error: error }, status: 500
  end

  def page_links
    account = current_merchant_user.account
    page_links = account.page_links
    render json: { status: 'success', page_links: page_links }, states: 200
  rescue => error
    render json: { status: 'fail', error: error }, status: 500
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
    render json: { status: 'fail', error: error }, status: 500
  end

  def stripe_account_info
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
    stripe_account_id = current_merchant_user.account.stripe_account_id
    if stripe_account_id.present?
      stripe_account = JSON.parse(Stripe::Account.retrieve(stripe_account_id).to_json)
      stripe_persons = JSON.parse(Stripe::Account.list_persons('acct_1LVs6c2c71M0ULtv',{limit: 100},).to_json)["data"]
    else
      stripe_account = {}
    end

    stripe_representative_person_id = current_merchant_user.account.stripe_representative_person_id
    if stripe_account_id.present? && stripe_representative_person_id.present?
      representative = Stripe::Account.retrieve_person(
        stripe_account_id,
        stripe_representative_person_id
      )
    else
      representative = {}
    end
    render json: { status: 'success', stripe_account: stripe_account, representative: representative }, states: 200
  rescue => error
    render json: { status: 'fail', error: error }, status: 500
  end

  def stripe_payment_history
    stripe_payment_intents = current_merchant_user.account.stripe_payment_intents
    stripe_payment_intents = JSON.parse(stripe_payment_intents.to_json(methods: [:customer_fullname]))
    render json: { status: 'success', stripe_payment_intents: stripe_payment_intents }, states: 200
  rescue => error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update_plan
    ActiveRecord::Base.transaction do
      account = current_merchant_user.account
      account.update!(service_plan: account_params[:service_plan])
      Stripe.api_key = Rails.configuration.stripe[:secret_key]
      if account_params[:service_plan] == 'Free' && account.stripe_subscription_id.present?
        Stripe::Subscription.cancel(
          account.stripe_subscription_id,
        )
      else
        if account.stripe_subscription_id.present?
          Stripe::Subscription.cancel(
            account.stripe_subscription_id,
          )
          system_stripe_subscription = SystemStripeSubscription.find_by(stripe_subscription_id: account.stripe_subscription_id)
          system_stripe_subscription.update!(canceled_at: Time.zone.now)
          account.update!(stripe_subscription_id: nil)
        end
        subscription = Stripe::Subscription.create({
          customer: account.stripe_customer_id,
          description: 'to merchant subscription plan',
          metadata: account.stripe_serivice_plan_subscription_metadata,
          items: [{ plan: account.service_plan_stripe_id }]
        })
        SystemStripeSubscription.create!(
          account_id: account.id,
          service_plan: account_params[:service_plan],
          stripe_subscription_id: subscription.id
        )
        account.update!(stripe_subscription_id: subscription.id)
      end
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    render json: { status: 'fail', error: error }, status: 500
  end

  def questionnaire_answers
    account = current_merchant_user.account
    answer_contents = account.answer_contents
    render json: { status: 'success', answer_contents: answer_contents }, states: 200
  rescue => error
    render json: { status: 'fail', error: error }, status: 500
  end

  def withdrawal
    ActiveRecord::Base.transaction do
      account = current_merchant_user.account
      account.update!(deleted_at: Time.zone.now)
      if account.stripe_subscription_id.present?
        Stripe.api_key = Rails.configuration.stripe[:secret_key]
        Stripe::Subscription.delete(
          account.stripe_subscription_id,
        )
      end
      account.merchant_users.destroy_all
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def account_params
    params.require(:account)
          .permit(:id,
                  :token,
                  :payment_method_id,
                  :business_profile_name,
                  :business_type,
                  :service_plan,
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
                  :company_postal_code,
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
                  :individual_identification_image,
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
                  :representative_address_state_kana,
                  :representative_address_city_kana,
                  :representative_address_town_kana,
                  :representative_address_line1_kana,
                  :representative_address_line2_kana,
                  :representative_identification_image,
                  :is_director_register_complete,
                  :account_number,
                  :bank_code,
                  :branch_code,
                  :account_holder_name,
                  :external_account_id)
  end
end
