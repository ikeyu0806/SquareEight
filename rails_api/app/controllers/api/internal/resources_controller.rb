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
    ActiveRecord::Base.transaction do
      resource = current_merchant_user.account.resources.new
      resource.name = params[:name]
      resource.description = params[:description]
      resource.quantity = params[:quantity].to_i
      resource.is_show_reserve_page = params[:is_show_reserve_page].eql?('true') ? true : false
      # if params["reserve_frame_ids"].present?
      #   params["reserve_frame_ids"].each do |reserve_frame_id|
      #     shop.shop_reserve_frames.create!(reserve_frame_id: reserve_frame_id)
      #   end
      # end
      resource.save!
    end
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
