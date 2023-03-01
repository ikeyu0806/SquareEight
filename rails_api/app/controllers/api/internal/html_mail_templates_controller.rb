include Base64Image

class Api::Internal::HtmlMailTemplatesController < ApplicationController
  before_action :merchant_login_only!

  def index
    account = current_merchant_user.account
    html_mail_templates = account.html_mail_templates
    customers = account.customers.email_sendable.order(:id)
    customer_groups = account.customer_groups
    render json: {  status: 'success',
                    html_mail_templates: html_mail_templates,
                    customers: customers,
                    customer_groups: customer_groups }, status: 200
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
      if c["image"].present? && !c["image"].match(/^https/)
        s3_public_url = put_s3_http_request_base64_data(c["image"], ENV["WEBPAGE_IMAGE_BUCKET"], "html_template_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N'))
        content_array.push({text: c["text"], image: s3_public_url})
      else
        content_array.push({text: c["text"]})
      end
    end
    html_mail_template.content = content_array.to_json
    html_mail_template.save!
    render json: { status: 'success', html_mail_template: html_mail_template }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update
    html_mail_template = HtmlMailTemplate.find_by(public_id: params[:public_id])
    html_mail_template.name = html_mail_template_params[:name]
    html_mail_template.mail_title = html_mail_template_params[:mail_title]
    content_param = JSON.parse(html_mail_template_params[:content].to_json)
    content_array = []
    content_param.each do |c|
      image = c["image"]
      if c["image"].present?
        if !c["image"].match(/^https/)
          image = put_s3_http_request_base64_data(c["base64Image"], ENV["WEBPAGE_IMAGE_BUCKET"], "html_template_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N'))
        else
          image = c["image"]
        end
        content = {text: c["text"], image: image}
      else
        content = {text: c["text"]}
      end
      content_array.push(content)
    end
    html_mail_template.content = content_array.to_json
    html_mail_template.save!
    render json: { status: 'success', html_mail_template: html_mail_template }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def send_mail
    account = current_merchant_user.account
    monthly_send_mail_count = account.send_mail_histories.where(created_at: Time.zone.now - 30.days...Time.zone.now).count
    raise "メール送信可能数を超えています" if monthly_send_mail_count >= account.send_mail_limit
    html_mail_template = HtmlMailTemplate.find_by(public_id: params[:public_id])
    if html_mail_template_params[:send_target_type] == 'customer'
      if html_mail_template_params[:is_send_message_all_customers]
        account.customers.email_sendable.each do |customer|
          parsed_content = JSON.parse(html_mail_template.content)
          HtmlMailTemplateMailer.send_mail(customer.email, parsed_content, html_mail_template.mail_title, html_mail_template.template_type).deliver_now
          account.send_mail_histories.create!(
            customer_id: customer.id,
            message_type: 'htmlMailTemplate',
            email: customer.email,
            mail_title: html_mail_template.mail_title,
            message_body: html_mail_template.content,
            merchant_user_id: current_merchant_user.id,
            html_template_type: html_mail_template.template_type
          )
        end
      else
        customer = Customer.find_by(public_id: html_mail_template_params[:selected_customer][:public_id])
        parsed_content = JSON.parse(html_mail_template.content)
        HtmlMailTemplateMailer.send_mail(customer.email, parsed_content, html_mail_template.mail_title, html_mail_template.template_type).deliver_now
        account.send_mail_histories.create!(
          customer_id: customer.id,
          message_type: 'htmlMailTemplate',
          email: customer.email,
          mail_title: html_mail_template.mail_title,
          message_body: html_mail_template.content,
          merchant_user_id: current_merchant_user.id,
          html_template_type: html_mail_template.template_type
        )
      end
    elsif html_mail_template_params[:send_target_type] == 'customerGroup'
      customer_group = CustomerGroup.find_by(public_id: html_mail_template_params[:selected_customer_group][:public_id])
      customer_group.customers.each do |customer|
        parsed_content = JSON.parse(html_mail_template.content)
        HtmlMailTemplateMailer.send_mail(customer.email, parsed_content, html_mail_template.mail_title, html_mail_template.template_type).deliver_now
        account.send_mail_histories.create!(
          customer_id: customer.id,
          message_type: 'htmlMailTemplate',
          email: customer.email,
          mail_title: html_mail_template.mail_title,
          message_body: html_mail_template.content,
          merchant_user_id: current_merchant_user.id,
          html_template_type: html_mail_template.template_type
        )
      end
    end
    render json: { status: 'success' }, status: 200
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
                  :send_target_type,
                  :is_send_message_all_customers,
                  content: [:text, :image, :base64Image],
                  selected_customer: [:public_id, :email],
                  selected_customer_group: [:public_id])
  end
end
