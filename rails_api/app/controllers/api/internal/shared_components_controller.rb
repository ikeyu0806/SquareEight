include Base64Image

class Api::Internal::SharedComponentsController < ApplicationController
  before_action :merchant_login_only!

  def show
    shared_component = current_merchant_user.account.shared_component
    render json: { status: 'success', shared_component: shared_component }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def register
    ActiveRecord::Base.transaction do
      shared_component = current_merchant_user.account.shared_component
      shared_component = SharedComponent.new(account: current_merchant_user.account) if shared_component.blank?
      # ブランドイメージはS3に登録
      if form_type_params[:navbar_brand_image].present? && form_type_params[:is_update_navbar_brand_image]
        file_name = "shared_component_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        shared_component.navbar_brand_image_s3_object_public_url = put_s3_http_request_base64_data(form_type_params[:navbar_brand_image], ENV["SHARED_COMPONENT_IMAGE_BUCKET"], file_name)
        shared_component.nabvar_brand_image_s3_object_name = file_name
      end
      shared_component.attributes = form_type_params.except(:navbar_brand_image, :is_update_navbar_brand_image)
      shared_component.save!
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def form_type_params
    JSON.parse(params.require(:shared_component), {symbolize_names: true})
  end
end
