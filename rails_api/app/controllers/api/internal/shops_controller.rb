class Api::Internal::ShopsController < ApplicationController
  before_action :merchant_login_only!

  def create
    ActiveRecord::Base.transaction do
      shop = current_merchant_user.account.shops.new
      shop.name = params[:name]
      if params[:page_cover_slide1_file].present?
        shop.register_s3_image(params[:page_cover_slide1_file], "page_cover_slide1_account_s3_image_id")
      end
      show.name = params[:name]
      show.save!
    end
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def shops_params
    params.require(:shops)
          .permit(:id,
                  :name,
                  page_cover_slide1_file: {})
  end  
end
