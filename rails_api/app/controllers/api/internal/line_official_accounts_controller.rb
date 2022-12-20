include LineClientModule

class Api::Internal::LineOfficialAccountsController < ApplicationController
  before_action :merchant_login_only!

  def index
    line_official_accounts = current_merchant_user.account.line_official_accounts.order(:id)
    line_official_accounts = JSON.parse(line_official_accounts.to_json(methods: [:messaging_api_webhook_url]))
    message_templates = current_merchant_user.account.message_templates.order(:id)
    render json: {  status: 'success',
                    line_official_accounts: line_official_accounts,
                    message_templates: message_templates }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def show
    line_official_account = LineOfficialAccount.find_by(public_id: params[:public_id])
    render json: {  status: 'success', line_official_account: line_official_account }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def line_users
    line_official_account = LineOfficialAccount.find_by(public_id: params[:public_id])
    line_users = line_official_account.line_users
    message_templates = current_merchant_user.account.message_templates.order(:id)
    render json: { status: 'success', line_users: line_users, message_templates: message_templates }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def register_message_api_channel
    account = current_merchant_user.account
    account.line_official_accounts.create!(
      name: line_official_account_params[:name],
      channel_id: line_official_account_params[:channel_id],
      channel_secret: line_official_account_params[:channel_secret],
      channel_token: line_official_account_params[:channel_token]
    )
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update
    line_official_account = LineOfficialAccount.find_by(public_id: params[:public_id])
    line_official_account.update!(
      name: line_official_account_params[:name],
      channel_id: line_official_account_params[:channel_id],
      channel_secret: line_official_account_params[:channel_secret],
      channel_token: line_official_account_params[:channel_token]
    )
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def push_message
    line_account = LineOfficialAccount.find_by(public_id: params[:public_id])
    client = line_messaging_client(line_account.channel_id, line_account.channel_secret, line_account.channel_token)
    line_user = LineUser.find_by(public_id: line_official_account_params[:line_user_public_id])
    last_name = ''
    first_name = ''
    price = ''
    payment_request_url = ''

    if line_user.customer.present?
      customer = line_user.customer
    else
      customer = current_merchant_user.account.customers.create!
      line_user.update!(customer_id: customer.id)
    end

    if line_official_account_params[:is_send_payment_request]
      price = line_official_account_params[:price]
      stripe_payment_request = current_merchant_user
                               .account
                               .stripe_payment_requests.create!(name: line_official_account_params[:payment_request_name],
                                                                price: price,
                                                                customer_id: customer.id,
                                                                line_user_id: line_user.id,
                                                                send_method: 'LINE')
      payment_request_url = ENV["FRONTEND_URL"] + '/payment_request/' + stripe_payment_request.public_id
    end

    message = MessageTemplate.convert_content(line_official_account_params[:message], last_name, first_name, price, payment_request_url)
    line_response = client.push_message(line_user.line_user_id, {
      type: 'text',
      text: message
    })
    raise "送信失敗しました" if line_response.code != "200"
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def broadcast
    line_account = LineOfficialAccount.find_by(public_id: params[:public_id])
    client = line_messaging_client(line_account.channel_id, line_account.channel_secret, line_account.channel_token)

    line_account.line_users.each do |line_user|
      last_name = ''
      first_name = ''
      price = ''
      payment_request_url = ''

      if line_user.customer.present?
        customer = line_user.customer
      else
        customer = current_merchant_user.account.customers.create!
        line_user.update!(customer_id: customer.id)
      end
  
      if line_official_account_params[:is_send_payment_request]
        price = line_official_account_params[:price]
        stripe_payment_request = current_merchant_user
                                 .account
                                 .stripe_payment_requests
                                 .create!(name: line_official_account_params[:payment_request_name],
                                          price: price,
                                          customer_id: customer.id,
                                          line_user_id: line_user.id,
                                          send_method: 'LINE')

        payment_request_url = ENV["FRONTEND_URL"] + '/payment_request/' + stripe_payment_request.public_id
      end
  
      message = MessageTemplate.convert_content(line_official_account_params[:message], last_name, first_name, price, payment_request_url)
      line_response = client.push_message(line_user.line_user_id, {
        type: 'text',
        text: message
      })
      # raise "送信失敗しました" if line_response.code != "200"
    end
  
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def line_official_account_params
    params.require(:line_official_account)
          .permit(:id,
                  :name,
                  :message,
                  :is_send_payment_request,
                  :payment_request_name,
                  :price,
                  :channel_id,
                  :channel_secret,
                  :channel_token,
                  :line_user_public_id)
  end
end
