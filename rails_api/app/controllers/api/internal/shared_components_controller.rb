class Api::Internal::SharedComponentsController < ApplicationController
  before_action :merchant_login_only!

  def show
    shared_component = current_merchant_user.account.shared_component
    render json: { status: 'success', shared_component: shared_component }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def register
    shared_component = current_merchant_user.account.shared_component
    current_merchant_user.account.shared_component.new if shared_component.blank?
    shared_component.attributes = shared_component_params
    shared_component.save!
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def shared_component_params
    params.require(:shared_components)
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
