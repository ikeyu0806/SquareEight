class Api::Internal::SharedComponentsController < ApplicationController
  before_action :merchant_login_only!

  def show
    shared_component = current_merchant_user.account.shared_component
    render json: { status: 'success', shared_component: shared_component }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def register
    ActiveRecord::Base.transaction do
      shared_component = current_merchant_user.account.shared_component
      shared_component = SharedComponent.new(account: current_merchant_user.account) if shared_component.blank?
      # ブランドイメージはS3に登録
      if shared_component_params[:navbar_brand_image].present?
        file_name = "shared_component_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        shared_component.navbar_brand_image_s3_object_public_url = put_s3_http_request_data(shared_component_params[:navbar_brand_image], ENV["SHARED_COMPONENT_IMAGE_BUCKET"], file_name)
        shared_component.nabvar_brand_image_s3_object_name = file_name
      end
      shared_component.attributes = shared_component_params.except(:navbar_brand_image)
      shared_component.save!
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def shared_component_params
    params.require(:shared_component)
          .permit(:id,
                  :navbar_brand_text,
                  :navbar_brand_type,
                  :navbar_brand_image,
                  :nabvar_brand_image_width,
                  :nabvar_brand_image_height,
                  :navbar_brand_background_color,
                  :navbar_brand_variant_color,
                  :footer_copyright_text)
  end
end
