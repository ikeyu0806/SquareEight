class Api::Internal::Account::CustomerGroupsController < ApplicationController
  before_action :merchant_login_only!

  def create
    customer_group = current_merchant_user.account.customer_groups.new(name: customer_group_params[:name])
    customer_group_params[:selected_customers].each do |customer|
      customer_group.customer_group_relations.new(customer_id: customer[:id])
    end
    customer_group.save!
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
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
