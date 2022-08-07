include Base64Image

class Api::Internal::ProductsController < ApplicationController
  before_action :merchant_login_only!

  def create
    ActiveRecord::Base.transaction do
      product = current_merchant_user.account.products.new(product_params.except(:base64_image))
      if ticket_master_params[:base64_image].present?
        file_name = "product_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        product.s3_object_public_url = put_s3_http_request_data(product_params[:base64_image], ENV["PRODUCT_IMAGE_BUCKET"], file_name)
        product.s3_object_name = file_name
      end
      product.save!
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def product_params
    params.require(:product)
          .permit(:id,
                  :name,
                  :price,
                  :tax_rate,
                  :base64_image,
                  :inventory,
                  :description,
                  :s3_object_public_url,
                  :s3_object_name,
                  product_types: [:name, :inventory])
  end
end
