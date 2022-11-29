class Api::Internal::AccountsController < ApplicationController
  before_action :merchant_login_only!

  def account_info
    account = current_merchant_user.account
    render json: { status: 'success', account: account }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update
    account = current_merchant_user.account
    account.update!(business_name: account_params[:business_name])
    render json: { status: 'success', account: account }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def dashboard_contents
    account = current_merchant_user.account
    # 通知
    notifications = account.account_notifications.order(created_at: :desc).limit(5)
    system_notifications = SystemAccountNotification.order(created_at: :desc).limit(5)

    # グラフのラベル
    week_days =  (0..6).to_a.map{|i| (Time.now - i.days).strftime("%Y/%m/%d")}.reverse
    # 顧客数グラフ
    customers = account.customers.where(created_at: (1.week.ago + 1.days).beginning_of_day..Time.zone.now.end_of_day)

    group_by_customers_count = customers.map{|customer| customer.created_at.strftime("%Y/%m/%d")}.group_by(&:itself).transform_values(&:size)
    customer_count_array = week_days.map do |day|
      group_by_customers_count[day].present? ? group_by_customers_count[day] : 0
    end
    # 新規顧客が0の日付を埋めて一週間以前の顧客総数を足し込む
    customer_count_array = customer_count_array.each_with_index do |a, i|
      if i > 0
        customer_count_array[i] = customer_count_array[i] + customer_count_array[i - 1]
      else
        customer_count_array[i] = customer_count_array[i] + account.customers.where("created_at <= ?", (1.week.ago).end_of_day).count
      end
    end
    # 売上グラフ
    payment_intents = account.stripe_payment_intents.where.not(system_product_type: "SystemPlan")
    payment_intent_content = payment_intents.map{|c| {charge_date: Time.at(c["created_at"]).strftime("%Y/%m/%d"), amount: c["amount"], application_fee_amount: c["application_fee_amount"].present? ? c["application_fee_amount"] : 0}}
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
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def payment_methods
    default_payment_method_id, payment_methods = current_merchant_user.account.payment_methods
    render json: { status: 'success',
                   payment_methods: payment_methods,
                   default_payment_method_id: default_payment_method_id }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def stripe_connected_account
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
    if current_merchant_user.account.stripe_account_id.present?
      stripe_account = Stripe::Account.retrieve(current_merchant_user.account.stripe_account_id)
    else
      stripe_account = nil
    end
    stripe_persons = current_merchant_user.account.stripe_persons.where(is_representative: false)
    if current_merchant_user.account.stripe_representative_person_id.present?
      representative_person = Stripe::Account.retrieve_person(
        current_merchant_user.account.stripe_account_id,
        current_merchant_user.account.stripe_representative_person_id
      )
    else
      representative_person = {}
    end
    render json: {  status: 'success',
                    stripe_persons: stripe_persons,
                    stripe_account: JSON.parse(stripe_account.to_json),
                    representative_person: JSON.parse(representative_person.to_json),
                    selected_external_account_id: current_merchant_user.account.selected_external_account_id }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def register_credit_card
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
    ActiveRecord::Base.transaction do
      account = current_merchant_user.account
      if account.stripe_customer_id.blank?
        customer = Stripe::Customer.create({
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
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def register_stripe_business_info
    Rails.logger.info "EXEC register_stripe_business_info action"
    Rails.logger.info "account_params"
    Rails.logger.info account_params

    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
    if current_merchant_user.account.stripe_account_id.blank?
      stripe_account = Stripe::Account.create({
        type: 'custom',
        country: 'JP',
        # ここでindividual適当に入れないとダメ？
        individual: (account_params[:business_type] == "individual") ? {last_name_kanji: ""} : nil,
        business_type: (account_params[:business_type] == "individual") ? "individual" : "company",
        email: current_merchant_user.email,
        capabilities: {
          card_payments: {requested: true},
          transfers: {requested: true},
        },
      })
      stripe_account.save
      current_merchant_user.account.update!(stripe_account_id: stripe_account.id, mcc: account_params[:mcc], mcc_type: account_params[:mcc_type])
    else
      stripe_account = Stripe::Account.retrieve(current_merchant_user.account.stripe_account_id)
      stripe_account.save
    end

    if account_params[:business_type] == "individual"
      stripe_account.business_profile.mcc = account_params[:mcc]
      stripe_account.business_profile.url = account_params[:individual_business_url]
      stripe_account.business_profile.product_description = account_params[:individual_product_description]
      # stripe_account.business_profile.name = account_params[:business_profile_name]
      stripe_account.business_profile.support_email = account_params[:individual_email]
      stripe_account.individual.email = account_params[:individual_email]
      stripe_account.individual.last_name_kanji = account_params[:individual_last_name_kanji]
      stripe_account.individual.last_name_kana = account_params[:individual_last_name_kana]
      stripe_account.individual.first_name_kanji = account_params[:individual_first_name_kanji]
      stripe_account.individual.first_name_kana = account_params[:individual_first_name_kana]
      stripe_account.individual.address_kanji.postal_code = account_params[:individual_postal_code_kanji]
      stripe_account.individual.address_kanji.state = account_params[:individual_state_kanji]
      stripe_account.individual.address_kanji.city = account_params[:individual_city_kanji]
      stripe_account.individual.address_kanji.town = account_params[:individual_town_kanji]
      stripe_account.individual.address_kanji.line1 = account_params[:individual_line1_kanji]
      stripe_account.individual.address_kanji.line2 = account_params[:individual_line2_kanji] if account_params[:individual_line2_kanji].present?
      stripe_account.individual.address_kana.postal_code = account_params[:individual_postal_code_kanji]
      stripe_account.individual.address_kana.state = account_params[:individual_state_kana]
      stripe_account.individual.address_kana.city = account_params[:individual_city_kana]
      stripe_account.individual.address_kana.town = account_params[:individual_town_kana]
      stripe_account.individual.address_kana.line1 = account_params[:individual_line1_kana]
      stripe_account.individual.address_kana.line2 = account_params[:individual_line2_kana] if account_params[:individual_line2_kana].present?

      if account_params[:individual_phone_number].start_with?("+81")
        stripe_account.individual.phone = account_params[:individual_phone_number]
      else
        stripe_account.individual.phone = '+81' + account_params[:individual_phone_number]
      end

      stripe_account.individual.gender = account_params[:individual_gender]
      split_birth_date = account_params["individual_birth_day"].split("-")
      stripe_account.individual.dob.year = split_birth_date[0]
      stripe_account.individual.dob.month = split_birth_date[1]
      stripe_account.individual.dob.day = split_birth_date[2]
      stripe_account.tos_acceptance.date = Time.now.to_i
      stripe_account.tos_acceptance.ip = request.remote_ip

      # 画像登録の前に一旦save
      stripe_account.save

      if account_params[:individual_identification_image].present?
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
        stripe_account.individual.verification.document.front = verification_document.id
        stripe_account.save
      end

      if account_params[:individual_additional_image].present?
        image_data = account_params[:individual_additional_image].gsub(/^data:\w+\/\w+;base64,/, "")
        decode_image = Base64.decode64(image_data)
        extension = account_params[:individual_additional_image].split("/")[1].split(";")[0]
        content_type = account_params[:individual_additional_image].split(":")[1].split(";")[0]
        obj_name =  "individual_additional_image" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N') + "." + extension

        File.open(obj_name, 'wb') do |file|
          file.write(decode_image)
        end
        individual_additional_image = File.open(obj_name, "r")
        verification_document = Stripe::File.create(
          {
            purpose: 'identity_document',
            file: individual_additional_image
          },
          {
            stripe_account: stripe_account.id
          }
        )
        stripe_account.individual.verification.additional_document.front = verification_document.id
        stripe_account.save
      end
    elsif account_params[:business_type] == "company"
      stripe_account.business_profile.mcc = '5734' if Rails.env.development?
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

      # 一旦trueにしてしまう。Stripeに求められそうなら実装
      # if account_params[:is_director_register_complete] == true
      #   stripe_account.company.directors_provided = true
      # end
      stripe_account.company.directors_provided = true

      stripe_account.tos_acceptance.date = Time.now.to_i
      stripe_account.tos_acceptance.ip = request.remote_ip

      stripe_account.save

      # 法人確認ドキュメント
      if account_params[:company_verification_document_image].present?
        image_data = account_params[:company_verification_document_image].gsub(/^data:\w+\/\w+;base64,/, "")
        decode_image = Base64.decode64(image_data)
        extension = account_params[:company_verification_document_image].split("/")[1].split(";")[0]
        content_type = account_params[:company_verification_document_image].split(":")[1].split(";")[0]
        obj_name =  "company_verification_document_image" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N') + "." + extension
    
        File.open(obj_name, 'wb') do |file|
          file.write(decode_image)
        end
        company_verification_document_image_file = File.open(obj_name, "r")
        verification_document = Stripe::File.create(
          {
            purpose: 'identity_document',
            file: company_verification_document_image_file
          },
          {
            stripe_account: stripe_account.id
          }
        )
        stripe_account.company.verification.document.front = verification_document
        stripe_account.save
      end

      # 法人代表者登録
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
        # postgreにも登録
        current_merchant_user.account.stripe_persons.create!(
          stripe_person_id: person.id,
          last_name: account_params[:representative_last_name_kanji],
          first_name: account_params[:representative_first_name_kanji],
          is_representative: true
        )
      end
      person.relationship.title = account_params[:relationship_title]
      # 以下optionalなので一旦コメントアウト。Stripeに怒られたら実装する
      # person.relationship.owner = account_params[:is_owner]
      # person.relationship.executive = account_params[:is_executive]
      # person.relationship.director = account_params[:is_director]
      # person.relationship.percent_ownership = account_params[:percent_ownership]
      current_merchant_user.account.update!(stripe_representative_person_id: person.id)
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
      person.save

      # 本人確認ドキュメント
      if account_params[:representative_identification_image].present?
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
        person.verification.document.front = verification_document
        person.save
      end
    end
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def register_stripe_bank_account
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
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
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update_selected_bank_account
    current_merchant_user.account.update!(selected_external_account_id: account_params[:external_account_id])
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def delete_bank_account
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
    Stripe::Account.delete_external_account(
      current_merchant_user.account.stripe_account_id,
      params[:external_account_id],
    )
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def page_links
    account = current_merchant_user.account
    page_links = account.page_links
    render json: { status: 'success', page_links: page_links }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update_payment_method
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
    Stripe::Customer.update(
      current_merchant_user.account.stripe_customer_id,
      {invoice_settings: {default_payment_method: params[:public_id]}},
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
      params[:public_id],
    )
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
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
    render json: { status: 'success', stripe_account: stripe_account, representative: representative }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def stripe_payment_history
    stripe_payment_intents = current_merchant_user.account.stripe_payment_intents
    stripe_payment_intents = JSON.parse(stripe_payment_intents.to_json(methods: [:customer_fullname]))
    render json: { status: 'success', stripe_payment_intents: stripe_payment_intents }, status: 200
  rescue => error
    Rails.logger.error error
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
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def cancel_plan
    ActiveRecord::Base.transaction do
      account = current_merchant_user.account
      cancel_subscription_id = account.stripe_subscription_id
      account.update!(stripe_subscription_id: nil)
      account.update!(service_plan: "Free")
      system_stripe_subscription = SystemStripeSubscription.find_by(stripe_subscription_id: cancel_subscription_id)
      system_stripe_subscription.update!(canceled_at: Time.zone.now)
      Stripe::Subscription.cancel(
        cancel_subscription_id,
      )
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def questionnaire_answers
    account = current_merchant_user.account
    answer_contents = account.answer_contents
    render json: { status: 'success', answer_contents: answer_contents }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def withdrawal
    ActiveRecord::Base.transaction do
      account = current_merchant_user.account
      account.update!(deleted_at: Time.zone.now)
      if account.stripe_subscription_id.present?
        Stripe.api_key = Rails.configuration.stripe[:secret_key]
        Stripe.api_version = '2022-08-01'
        Stripe::Subscription.delete(
          account.stripe_subscription_id,
        )
      end
      account.merchant_users.destroy_all
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def register_stripe_person
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
    ActiveRecord::Base.transaction do
      stripe_account_id = current_merchant_user.account.stripe_account_id
      if account_params[:stripe_person_id].present?
        postgre_person = current_merchant_user.account.stripe_persons.find(account_params[:stripe_person_id])
      end
      if postgre_person.present?
        person = Stripe::Account.retrieve_person(
          stripe_account_id,
          postgre_person.stripe_person_id
        )
      else
        person = Stripe::Account.create_person(
          stripe_account_id
        )
        # postgreにも登録
        current_merchant_user.account.stripe_persons.create!(
          stripe_person_id: person.id,
          last_name: account_params[:representative_last_name_kanji],
          first_name: account_params[:representative_first_name_kanji]
        )
      end
      person.relationship.representative = false
      person.relationship.title = account_params[:relationship_title]
      person.relationship.owner = account_params[:is_owner]
      person.relationship.executive = account_params[:is_executive]
      person.relationship.director = account_params[:is_director]
      person.relationship.percent_ownership = account_params[:percent_ownership]
      current_merchant_user.account.update!(stripe_representative_person_id: person.id)
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
      person.save
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def account_params
    params.require(:account)
          .permit(:id,
                  :business_name,
                  :token,
                  :public_id,
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
                  :company_verification_document_image,
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
                  :is_director,
                  :is_executive,
                  :is_owner,
                  :is_representative,
                  :percent_ownership,
                  :relationship_title,
                  :account_number,
                  :bank_code,
                  :branch_code,
                  :account_holder_name,
                  :external_account_id,
                  :stripe_person_id,
                  :mcc,
                  :mcc_type)
  end
end
