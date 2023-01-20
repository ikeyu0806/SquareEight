class Api::Internal::ShopsController < ApplicationController
  before_action :merchant_login_only!

  def create
    ActiveRecord::Base.transaction do
      shop = current_merchant_user.account.shops.new
      shop.name = params[:name]
      shop.description1 = params[:description1]
      shop.description2 = params[:description2]
      shop.postal_code = params[:postal_code]
      shop.state = params[:state]
      shop.city = params[:city]
      shop.town = params[:town]
      shop.line1 = params[:line1]
      shop.line2 = params[:line2]
      shop.remarks = params[:remarks]
      shop.save!
      if params[:page_cover_slide1_file].present?
        shop.register_s3_image(params[:page_cover_slide1_file], "page_cover_slide1_account_s3_image_id")
      end
      if params[:page_cover_slide2_file].present?
        shop.register_s3_image(params[:page_cover_slide2_file], "page_cover_slide2_account_s3_image_id")
      end
      if params[:page_cover_slide3_file].present?
        shop.register_s3_image(params[:page_cover_slide3_file], "page_cover_slide3_account_s3_image_id")
      end
      shop.save!
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
                  :description1,
                  :description2,
                  page_cover_slide1_file: {})
  end  
end
