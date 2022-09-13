class Api::Internal::ResourcesController < ApplicationController
  before_action :merchant_login_only!

  def index
    resources = current_merchant_user.account.resources
    render json: { status: 'success', resources: resources }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def edit
    resource = current_merchant_user.account.resources.find(params[:id])
    render json: { status: 'success', resource: resource }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    current_merchant_user.account.resources.create!(resource_params)
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update
    resource = Resource.find(params[:id])
    resource.update!(resource_params)
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def resource_params
    params.require(:resources)
          .permit(:id,
                  :name,
                  :quantity)
  end
end
