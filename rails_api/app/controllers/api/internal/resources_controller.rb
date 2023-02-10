class Api::Internal::ResourcesController < ApplicationController
  before_action :merchant_login_only!

  def index
    resources = current_merchant_user.account.resources
    resources = JSON.parse(resources.to_json(methods: [:resource_type_text]))
    render json: { status: 'success', resources: resources }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def show
    account = current_merchant_user.account
    resource = account.resources.find_by(public_id: params[:public_id])
    shared_component = resource.account.shared_component
    resource = resource.to_json(methods: [:resource_image1_public_url, :selected_shop_ids, :selected_reserve_frame_ids, :reserve_frames_info])
    resource = JSON.parse(resource)
    selectable_reserve_frames = account.reserve_frames.enabled
    render json: { status: 'success',
                   resource: resource,
                   shared_component: shared_component,
                   selectable_reserve_frames: selectable_reserve_frames }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def related_data
    account = current_merchant_user.account
    selectable_reserve_frames = account.reserve_frames.enabled
    render json: { status: 'success',
                   selectable_reserve_frames: selectable_reserve_frames }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def create
    raise "リソース登録可能数を超えています" if current_merchant_user.account.resources.count >= current_merchant_user.account.resource_limit
    ActiveRecord::Base.transaction do
      resource = current_merchant_user.account.resources.new
      resource.name = params[:name]
      resource.description = params[:description]
      resource.quantity = params[:quantity].to_i
      resource.resource_type = params[:resource_type]
      resource.is_show_reserve_page = params[:is_show_reserve_page].eql?('true') ? true : false
      if params[:resource_image1_file].present? && !params[:resource_image1_file].eql?("null")
        resource.register_s3_image(params[:resource_image1_file], "resource_image1_account_s3_image_id")
      end
      if params["shop_ids"].present?
        params["shop_ids"].each do |shop_id|
          resource.shop_resources.create!(shop_id: shop_id)
        end
      end
      if params["reserve_frame_ids"].present?
        params["reserve_frame_ids"].each do |reserve_frame_id|
          resource.reserve_frame_resources.create!(reserve_frame_id: reserve_frame_id)
        end
      end
      resource.save!
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update
    ActiveRecord::Base.transaction do
      resource = Resource.find_by(public_id: params[:public_id])
      resource.name = params[:name]
      resource.description = params[:description]
      resource.quantity = params[:quantity].to_i
      resource.resource_type = params[:resource_type]
      resource.is_show_reserve_page = params[:is_show_reserve_page].eql?('true') ? true : false
      if params[:resource_image1_file].present? && !params[:resource_image1_file].eql?("null")
        resource.register_s3_image(params[:resource_image1_file], "resource_image1_account_s3_image_id")
      end
      resource.shop_resources.destroy_all
      if params["shop_ids"].present?
        params["shop_ids"].each do |shop_id|
          resource.shop_resources.create!(shop_id: shop_id)
        end
      end
      resource.reserve_frame_resources.destroy_all
      if params["reserve_frame_ids"].present?
        params["reserve_frame_ids"].each do |reserve_frame_id|
          resource.reserve_frame_resources.create!(reserve_frame_id: reserve_frame_id)
        end
      end
      resource.save!
      render json: { status: 'success' }, status: 200
    end
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
