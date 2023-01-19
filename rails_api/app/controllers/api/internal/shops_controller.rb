class Api::Internal::ShopsController < ApplicationController
  before_action :merchant_login_only!

  def create
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
