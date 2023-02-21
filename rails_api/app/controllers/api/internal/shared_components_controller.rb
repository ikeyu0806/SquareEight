include Base64Image

class Api::Internal::SharedComponentsController < ApplicationController
  before_action :merchant_login_only!

  def show
    shared_component = current_merchant_user.account.shared_component
    shared_component = JSON.parse(shared_component.to_json(methods: [:navbar_image_account_s3_image_public_url]))
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
      if params[:navbar_brand_image].present? && !params[:navbar_brand_image].eql?("null")
        shared_component.register_navbar_image(params[:navbar_brand_image])
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
