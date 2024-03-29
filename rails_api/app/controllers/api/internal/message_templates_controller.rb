class Api::Internal::MessageTemplatesController < ApplicationController
  before_action :merchant_login_only!

  def index
    # ページネーション
    current_page = params[:current_page].to_i
    display_count = params[:display_count].to_i
    account = current_merchant_user.account
    message_templates = account.message_templates.order(:id)
    last_page, remainder = message_templates.count.divmod(display_count)
    last_page += 1 if remainder.positive?
    message_templates = message_templates.first(current_page * display_count).last(display_count)
    customers = account.customers.order(:id)
    customer_groups = account.customer_groups
    page_links = account.page_links
    render json: { status: 'success',
                   message_templates: message_templates,
                   customers: customers,
                   customer_groups: customer_groups,
                   page_links: page_links,
                   last_page: last_page }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def create
    current_merchant_user.account.message_templates.create!(message_template_params)
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update
    message_template = MessageTemplate.find_by(public_id: params[:public_id])
    message_template.update!(message_template_params)
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def send_mail
    account = current_merchant_user.account
    monthly_send_mail_count = account.send_mail_histories.where(created_at: Time.zone.now - 30.days...Time.zone.now).count
    raise "メール送信可能数を超えています" if monthly_send_mail_count >= account.send_mail_limit
    message_template = MessageTemplate.find_by(public_id: params["public_id"])
    title = message_template.title
    content = message_template.content
    if message_template_params[:target_type] == 'customer'
      email = message_template_params[:target_customers][:email]
      customer = Customer.find(message_template_params[:target_customers][:id])
      stripe_payment_request = customer.stripe_payment_requests.create!(
        name: message_template_params[:payment_request_name],
        price: message_template_params[:payment_request_price],
        account_id: account.id,
      )
      content = MessageTemplate.convert_content(content, message_template_params[:target_customers][:last_name], message_template_params[:target_customers][:first_name])
      MessageTemplateMailer.send_mail(email, title, content).deliver_now
    elsif message_template_params[:target_type] == 'customerGroup'
      group = message_template_params["target_customer_groups"]
      customer_group = CustomerGroup.find(group["id"])
      customer_group.customers.each do |customer|
        email = customer.email
        stripe_payment_request = customer.stripe_payment_requests.create!(
          name: message_template_params[:payment_request_name],
          price: message_template_params[:payment_request_price],
          account_id: account.id,
        )
        content = MessageTemplate.convert_content(content, customer.last_name, customer.first_name)
        MessageTemplateMailer.send_mail(email, title, content).deliver_now
      end
    else
      raise 'Invalid target_type'
    end
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def destroy
    message_template = MessageTemplate.find_by(public_id: params[:public_id])
    message_template.destroy
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end


  private

  def message_template_params
    params.require(:message_template)
          .permit(:id,
                  :public_id,
                  :target_type,
                  :target_emails,
                  :name,
                  :title,
                  :content,
                  :is_send_payment_request,
                  :payment_request_name,
                  :payment_request_price,
                  target_customers: [:id, :last_name, :first_name, :email, :phone_number],
                  target_customer_groups: [:id, :name])
  end
end
