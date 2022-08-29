class Api::Internal::MessageTemplatesController < ApplicationController
  before_action :merchant_login_only!

  def index
    account = current_merchant_user.account
    message_templates = account.message_templates.order(:id)
    customers = account.customers.order(:id)
    page_links = account.page_links
    render json: { statue: 'success',
                   message_templates: message_templates,
                   customers: customers,
                   page_links: page_links }, status: 200
  rescue => e
    render json: { statue: 'fail', error: e }, status: 500
  end

  def create
    current_merchant_user.account.message_templates.create!(message_template_params)
    render json: { statue: 'success' }, status: 200
  rescue => e
    render json: { statue: 'fail', error: e }, status: 500
  end

  def update
    message_template = MessageTemplate.find(params[:id])
    message_template.update!(message_template_params)
    render json: { statue: 'success' }, status: 200
  rescue => e
    render json: { statue: 'fail', error: e }, status: 500
  end

  def send_mail
    MessageTemplateMailer.send_mail(message_template_params[:email], message_template_params[:content])
    render json: { statue: 'success' }, status: 200
  rescue => e
    render json: { statue: 'fail', error: e }, status: 500
  end


  private

  def message_template_params
    params.require(:message_template)
          .permit(:id,
                  :target_email,
                  :name,
                  :title,
                  :content)
  end
end
