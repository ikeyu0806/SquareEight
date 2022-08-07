class Api::Internal::ProductsController < ApplicationController

  def create
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
