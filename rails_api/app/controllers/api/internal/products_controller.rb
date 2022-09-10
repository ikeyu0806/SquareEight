include Base64Image

class Api::Internal::ProductsController < ApplicationController
  before_action :merchant_login_only!, only: :create

  def index
    products = current_merchant_user.account.products.order(:id)
    render json: { status: 'success', products: products }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def show
    product = Product.find(params[:id])
    product = JSON.parse(product.to_json(methods: [:product_types, :show_product_type_form]))
    render json: { status: 'success', product: product }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    ActiveRecord::Base.transaction do
      product = current_merchant_user.account.products.new(product_params.except(:base64_image, :product_types))
      if product_params[:base64_image].present?
        file_name = "product_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        product.s3_object_public_url = put_s3_http_request_data(product_params[:base64_image], ENV["PRODUCT_IMAGE_BUCKET"], file_name)
        product.s3_object_name = file_name
      end
      product_params[:product_types].each do |product_type|
        product.product_types.new(name: product_type[:name], inventory: product_type[:inventory])
      end
      product.save!
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update
    ActiveRecord::Base.transaction do
      product = Product.find(params[:id])
      product.attributes = (product_params.except(:base64_image))
      if (product_params[:base64_image].present?)
        product.delete_s3_image if product.s3_object_public_url.present?
        file_name = "ticket_master_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        product.s3_object_public_url = put_s3_http_request_data(product_params[:base64_image], ENV["PRODUCT_IMAGE_BUCKET"], file_name)
        product.s3_object_name = file_name
      end
      product.save!
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def purchase_info
    product = Product.find(params[:id])
    shared_component = product.account.shared_component
    if current_end_user.present?
      default_payment_method_id, payment_methods = current_end_user.payment_methods
      delivery_targets = current_end_user.delivery_targets.order(:id)
      login_status = 'Login'
    else
      default_payment_method_id = nil
      payment_methods = []
      delivery_targets = []
      login_status = 'Logout'
    end
    render json: { status: 'success',
                   product: product,
                   shared_component: shared_component,
                   payment_methods: payment_methods,
                   delivery_targets: delivery_targets,
                   default_payment_method_id: default_payment_method_id,
                   current_end_user_id: current_end_user.present? ? current_end_user.id : nil,
                   login_status: login_status }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def insert_cart
    ActiveRecord::Base.transaction do
      product = Product.find(product_params[:id])
      product.cart_products.create!(
        end_user_id: current_end_user.id,
        account_id: product.account_id,
        quantity: product_params[:purchase_quantity]
      )
      if (product_params[:is_registered_address] == false)
        delivery_target = current_end_user
                          .delivery_targets
                          .new( first_name: product_params[:first_name],
                                last_name: product_params[:last_name],
                                postal_code: product_params[:postal_code],
                                state: product_params[:state],
                                city: product_params[:city],
                                town: product_params[:town],
                                line1: product_params[:line1],
                                line2: product_params[:line2],
                                phone_number: product_params[:phone_number])
        delivery_target.is_default = true
        delivery_target.save!
      end
      render json: { status: 'success' }, status: 200
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
                  :purchase_quantity,
                  :is_registered_address,
                  :first_name,
                  :last_name,
                  :postal_code,
                  :state,
                  :city,
                  :town,
                  :line1,
                  :line2,
                  :phone_number,
                  product_types: [:name, :inventory])
  end
end
