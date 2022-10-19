class Api::Internal::PaymentRequestsController < ApplicationController
  before_action :merchant_login_only!, except: [:show, :exec_payment]
  before_action :end_user_login_only!, only: [:exec_payment]

  def index
    payment_requests = current_merchant_user.account.stripe_payment_requests
    payment_requests = JSON.parse(payment_requests.to_json(methods: [:display_status, :request_url, :billing_customer_name, :billing_customer_email]))
    render json: {  status: 'success', payment_requests: payment_requests }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def show
    payment_request = StripePaymentRequest.find(params[:id])
    shared_component = payment_request.account.shared_component
    if current_end_user.present?
      default_payment_method_id, payment_methods = current_end_user.payment_methods
      login_status = 'Login'
    else
      default_payment_method_id = nil
      payment_methods = []
      login_status = 'Logout'
    end
    render json: {  status: 'success',
                    default_payment_method_id: default_payment_method_id,
                    payment_methods: payment_methods,
                    payment_request: payment_request,
                    login_status: login_status,
                    shared_component: shared_component }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def init_stat
    account = current_merchant_user.account
    customers = account.customers
    customer_groups = account.customer_groups
    message_templates = account.message_templates
    render json: {  status: 'success',
                    customers: customers,
                    customer_groups: customer_groups,
                    message_templates: message_templates }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def send_payment_request_mail
    account = current_merchant_user.account
    case payment_request_params[:target_customer_type]
    when 'registeredCustomer' then
      payment_request_params[:selected_customers].each do |customer|
        stripe_payment_request = account.stripe_payment_requests.create!(name: payment_request_params[:name], price: payment_request_params[:price], customer_id: customer[:id])
        payment_request_url = ENV["FRONTEND_URL"] + '/payment_request/' + stripe_payment_request.id.to_s
        content = MessageTemplate
                  .convert_content(
                    payment_request_params[:content],
                    customer[:last_name],
                    customer[:first_name],
                    payment_request_params[:price],
                    payment_request_url)
        PaymentRequestMailer.payment_request_mail(customer[:email], payment_request_params[:title], content).deliver_later
      end
    when 'customerGroup' then
      customer_groups = account.customer_groups.where(id: payment_request_params[:selected_customer_groups].pluck(:id))
      customer_groups.each do |group|
        group.customers.each do |customer|
          stripe_payment_request = account.stripe_payment_requests.create!(price: payment_request_params[:price], customer_id: customer.id)
          payment_request_url = ENV["FRONTEND_URL"] + '/payment_request/' + stripe_payment_request.id.to_s
          content = MessageTemplate
                    .convert_content(
                      payment_request_params[:content],
                      customer.last_name,
                      customer.first_name,
                      payment_request_params[:price],
                      payment_request_url)
          PaymentRequestMailer.payment_request_mail(customer.email, payment_request_params[:title], content).deliver_later
        end
      end
    when 'newCustomer' then
      email = customer_params[:email]
      customer = account.customers.create!(customer_params)
      stripe_payment_request = account.stripe_payment_requests.create!(price: payment_request_params[:price], customer_id: customer.id)
      payment_request_url = ENV["FRONTEND_URL"] + '/payment_request/' + stripe_payment_request.id.to_s
      content = MessageTemplate
                .convert_content(
                  payment_request_params[:content],
                  customer.last_name,
                  customer.first_name,
                  payment_request_params[:price],
                  payment_request_url)
      PaymentRequestMailer.payment_request_mail(email, payment_request_params[:title], content).deliver_later
    else
      raise '不正なパラメータです'
    end
    render json: {  status: 'success' }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def exec_payment
    ActiveRecord::Base.transaction do
      Stripe.api_key = Rails.configuration.stripe[:secret_key]
      customer = current_end_user.customer
      if customer.blank?
        customer = current_end_user
                   .customer
                   .create!(email: current_end_user.email,
                            phone_number: current_end_user.phone_number,
                            first_name: current_end_user.first_name,
                            last_name: current_end_user.last_name)
      end
      payment_request = StripePaymentRequest.find(payment_request_params[:id])
      account = payment_request.account
      commission = account.application_fee_amount.to_i
      stripe_customer = Stripe::Customer.retrieve(current_end_user.stripe_customer_id)
      default_payment_method_id = stripe_customer["invoice_settings"]["default_payment_method"]
      payment_intent = Stripe::PaymentIntent.create({
        amount: payment_request.price,
        currency: 'jpy',
        payment_method_types: ['card'],
        payment_method: default_payment_method_id,
        customer: current_end_user.stripe_customer_id,
        application_fee_amount: commission,
        metadata: {
          'purchase_product_name': payment_request.name,
          'order_date': current_date_text,
          'payment_request_id': payment_request.id,
          'account_business_name': account.business_name,
          'price': payment_request.price,
          'type': 'product',
          'end_user_id': current_end_user.id,
          'account_id': account.id
        },
        transfer_data: {
          destination: account.stripe_account_id
        }
      })
      Stripe::PaymentIntent.confirm(
        payment_intent.id
      )
      # エンドユーザ通知
      end_user_notification_title = payment_request.name + 'のお支払いが完了しました'
      current_end_user.create_product_purchase_notification(end_user_notification_title)
      # ビジネスオーナー向け通知
      account_notification_title = customer.full_name + 'から' + payment_request.name + 'のお支払いを受けつけました。'
      account_notification_url = '/admin/customer/' + customer.id.to_s + '/order'
      account
      .account_notifications
      .create!(title: account_notification_title, url: account_notification_url)
      payment_request.update!(status: 'Paid')
      render json: {  status: 'success' }, status: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def payment_request_params
    params.require(:payment_request)
          .permit(:id,
                  :name,
                  :price,
                  :title,
                  :content,
                  :target_customer_type,
                  selected_customer_groups: [:id,
                                             :account_id,
                                             :name,
                                             :category,
                                             :created_at,
                                             :updated_at],
                  selected_customers: [ :id,
                                        :first_name,
                                        :last_name,
                                        :first_name_kana,
                                        :email,
                                        :phone_number,
                                        :gender,
                                        :dob,
                                        :notes ],)
  end

  def customer_params
    params.require(:customer)
          .permit(:id,
                  :first_name,
                  :last_name,
                  :first_name_kana,
                  :email,
                  :phone_number,
                  :gender,
                  :dob,
                  :notes)
  end
end
