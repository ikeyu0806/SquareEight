class Api::Internal::ResourcesController < ApplicationController
  before_action :merchant_login_only!

  def index
    resources = current_merchant_user.account.resources
    render json: { status: 'success', resources: resources }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def edit
    resource = current_merchant_user.account.resources.find_by(public_id: params[:public_id])
    render json: { status: 'success', resource: resource }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def create
    current_merchant_user.account.resources.create!(resource_params)
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update
    resource = Resource.find_by(public_id: params[:public_id])
    resource.update!(resource_params)
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def resource_params
    params.require(:resources)
          .permit(:id,
                  :name,
                  :quantity)
  end
end
