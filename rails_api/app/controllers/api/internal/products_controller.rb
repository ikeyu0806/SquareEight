class Api::Internal::ProductsController < ApplicationController
  before_action :merchant_login_only!

  def create
    current_merchant_user.products.create!(product_params)
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def product_params
    params.require(:product)
          .permit(:id,
                  :name,
                  :price,
                  :tax_rage,
                  :inventory,
                  :description,
                  :s3_object_public_url,
                  :s3_object_name,
                  product_types: [:name, :inventory])
  end
end
