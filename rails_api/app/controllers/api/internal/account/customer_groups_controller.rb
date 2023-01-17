class Api::Internal::Account::CustomerGroupsController < ApplicationController
  before_action :merchant_login_only!

  def index
    customer_groups = current_merchant_user.account.customer_groups
    html_mail_templates = current_merchant_user.account.html_mail_templates
    html_template_content = html_mail_templates.present? ? JSON.parse(html_mail_templates.first.content) : []
    render json: {  status: 'success',
                    customer_groups: customer_groups,
                    html_mail_templates: html_mail_templates,
                    selected_html_mail_template: html_mail_templates.first || {},
                    selected_html_template_content: html_template_content  }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def show
    customer_group = CustomerGroup.find_by(public_id: params[:public_id])
    selected_customers = customer_group.customers
    unselected_customers = current_merchant_user.account.customers.where.not(id: selected_customers.pluck(:id))
    render json: {  status: 'success',
                    customer_group: customer_group,
                    selected_customers: selected_customers,
                    unselected_customers: unselected_customers }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def create
    customer_group = current_merchant_user.account.customer_groups.new(name: customer_group_params[:name])
    customer_group_params[:selected_customers].each do |customer|
      customer_group.customer_group_relations.new(customer_id: customer[:id])
    end
    customer_group.save!
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update
    customer_group = current_merchant_user.account.customer_groups.find_by(public_id: params[:public_id])
    customer_group.name = customer_group_params[:name]
    customer_group.customer_group_relations.delete_all
    customer_group_params[:selected_customers].each do |customer|
      customer_group.customer_group_relations.new(customer_id: customer[:id])
    end
    customer_group.save!
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def customer_group_params
    params.require(:customer_group)
          .permit(:id,
                  :name,
                  selected_customers: [:id],
                  unselected_customers: [:id])
  end
end
