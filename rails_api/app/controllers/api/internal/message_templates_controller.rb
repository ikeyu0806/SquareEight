class Api::Internal::MessageTemplatesController < ApplicationController
  before_action :merchant_login_only!

  def index
    account = current_merchant_user.account
    message_templates = account.message_templates.order(:id)
    customers = account.customers.order(:id)
    customer_groups = account.customer_groups
    page_links = account.page_links
    render json: { statue: 'success',
                   message_templates: message_templates,
                   customers: customers,
                   customer_groups: customer_groups,
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
    if message_template_params[:target_type] == 'Customer'
      message_template_params[:target_customers].each do |target_customer_param|
        email = target_customer_param[:email]
        title = message_template_params["title"]
        content = message_template_params["content"]
                  .gsub(/%customer_name/, target_customer_param['last_name'] + target_customer_param['first_name'])
        MessageTemplateMailer.send_mail(email, title, content).deliver_later
      end
    elsif message_template_params[:target_type] == 'Email'
      message_template_params["target_emails"].split(',').each do |email|
        email = email
        content = message_template_params["content"].gsub(/\n/, "<br />")
        title = message_template_params["title"]
        MessageTemplateMailer.send_mail(email, title, content).deliver_later
      end
    elsif message_template_params[:target_type] == 'CustomerGroup'
      content = message_template_params["content"].gsub(/\n/, "<br />")
      title = message_template_params["title"]
      target_emails = []
      message_template_params["target_customer_groups"].each do |group|
        customer_group = CustomerGroup.find(group["id"])
        target_emails = target_emails + customer_group.customers.pluck(:email)
      end
      target_emails = target_emails.uniq
      target_emails.each do |email|
        MessageTemplateMailer.send_mail(email, title, content).deliver_later
      end
    else
      raise 'Invalid target_type'
    end
    render json: { statue: 'success' }, status: 200
  rescue => e
    render json: { statue: 'fail', error: e }, status: 500
  end


  private

  def message_template_params
    params.require(:message_template)
          .permit(:id,
                  :target_type,
                  :target_emails,
                  :name,
                  :title,
                  :content,
                  target_customers: [:id, :last_name, :first_name, :email, :phone_number],
                  target_customer_groups: [:id, :name])
  end
end
