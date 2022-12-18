include Base64Image

class Api::Internal::HtmlMailTemplatesController < ApplicationController
  before_action :merchant_login_only!

  def index
    html_mail_templates = current_merchant_user.account.html_mail_templates
    render json: { status: 'success', html_mail_templates: html_mail_templates }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def show
    html_mail_template = HtmlMailTemplate.find_by(public_id: params[:public_id])
    content = JSON.parse(html_mail_template.content)
    render json: { status: 'success', html_mail_template: html_mail_template, content: content }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def create
    html_mail_template = current_merchant_user.account.html_mail_templates.new(html_mail_template_params.except([:content]))
    content_param = JSON.parse(html_mail_template_params[:content].to_json)
    content_array = []
    content_param.each do |c|
      if c["image"].present?
        s3_public_url = put_s3_http_request_data(c["image"], ENV["WEBPAGE_IMAGE_BUCKET"], "html_template_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N'))
        content_array.push({text: c["text"], image: s3_public_url})
      else
        content_array.push({text: c["text"]})
      end
    end
    html_mail_template.content = content_array.to_json
    html_mail_template.save!
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update
    html_mail_template = HtmlMailTemplate.find_by(public_id: params[:public_id])
    content_param = JSON.parse(html_mail_template_params[:content].to_json)
    content_array = []
    content_param.each do |c|
      s3_public_url = put_s3_http_request_data(c["base64Image"], ENV["WEBPAGE_IMAGE_BUCKET"], "html_template_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N'))
      content_array.push({text: c["text"], image: s3_public_url})
    end
    html_mail_template.content = content_array.to_s
    render json: { status: 'success', html_mail_template: html_mail_template }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def html_mail_template_params
    params.require(:html_mail_templates)
          .permit(:id,
                  :public_id,
                  :name,
                  :mail_title,
                  :template_type,
                  content: [:text, :image, :base64Image])
  end
end
