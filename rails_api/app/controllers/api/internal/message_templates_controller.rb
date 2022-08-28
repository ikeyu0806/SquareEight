class Api::Internal::MessageTemplatesController < ApplicationController
  before_action :merchant_login_only!

  def index
    message_templates = current_merchant_user.account.message_templates
    render json: { statue: 'success', message_templates: message_templates }, status: 200
  rescue => e
    render json: { statue: 'fail', error: e }, status: 500
  end

  def create
    current_merchant_user.account.message_templates.create!(message_template_params)
    render json: { statue: 'success' }, status: 200
  rescue => e
    render json: { statue: 'fail', error: e }, status: 500
  end

  private

  def message_template_params
    params.require(:message_template)
          .permit(:id,
                  :name,
                  :content)
  end
end
