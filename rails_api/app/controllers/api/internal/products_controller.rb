include Base64Image

class Api::Internal::ProductsController < ApplicationController
  before_action :merchant_login_only!, only: [:index, :create, :update, :logical_delete]
  before_action :end_user_login_only!, only: [:insert_cart]

  def index
    products = current_merchant_user.account.products.enabled.order(:id)
    products = JSON.parse(products.to_json(methods: [:product_types, :show_product_type_form]))
    render json: { status: 'success', products: products }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def show
    product = Product.enabled.find_by(public_id: params[:public_id])
    product = JSON.parse(product.to_json(methods: [:product_types,
      :show_product_type_form,
      :shipping_fee_per_regions,
      :delivery_charge_type,
      :selected_shop_ids,
      :image1_account_s3_image_public_url,
      :image2_account_s3_image_public_url,
      :image3_account_s3_image_public_url,
      :image4_account_s3_image_public_url,
      :image5_account_s3_image_public_url]))
    render json: { status: 'success', product: product }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def create
    ActiveRecord::Base.transaction do
      product = current_merchant_user.account.products.new(product_params.except(:base64_image, :product_types, :prefecture_delivery_charges, :shops))
      if product_params[:product_types].present?
        product_params[:product_types].each do |product_type|
          product.product_types.new(name: product_type[:name], inventory: product_type[:inventory])
        end
      end
      if product_params[:prefecture_delivery_charges].present?
        product_params[:prefecture_delivery_charges].each do |prefecture_delivery_charge|
          product.shipping_fee_per_regions.new(region: prefecture_delivery_charge[:region], shipping_fee: prefecture_delivery_charge[:shipping_fee])
        end
      end
      product.save!
      if product_params[:shops].present?
        product_params[:shops].each do |s|
          shop = Shop.find_by(public_id: s[:public_id])
          product.shop_products.create!(shop_id: shop.id)
        end
      end
      if params[:product_image1_file].present? && !params[:product_image1_file].eql?("null")
        file_name = "product_image1_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        product.register_s3_image(file_name, params[:product_image1_file], "image1_account_s3_image_id")
      end
      if params[:product_image2_file].present? && !params[:product_image2_file].eql?("null")
        file_name = "product_image2_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        product.register_s3_image(file_name, params[:product_image2_file], "image2_account_s3_image_id")
      end
      if params[:product_image3_file].present? && !params[:product_image3_file].eql?("null")
        file_name = "product_image3_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        product.register_s3_image(file_name, params[:product_image3_file], "image3_account_s3_image_id")
      end
      if params[:product_image4_file].present? && !params[:product_image4_file].eql?("null")
        file_name = "product_image4_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        product.register_s3_image(file_name, params[:product_image4_file], "image4_account_s3_image_id")
      end
      if params[:product_image5_file].present? && !params[:product_image5_file].eql?("null")
        file_name = "product_image5_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        product.register_s3_image(file_name, params[:product_image5_file], "image5_account_s3_image_id")
      end
      product.save!
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update
    ActiveRecord::Base.transaction do
      product = Product.find_by(public_id: params[:public_id])
      product.attributes = (product_params.except(:base64_image, :product_types, :prefecture_delivery_charges, :shops))
      product.product_types.delete_all
      product_params[:product_types].each do |product_type|
        product.product_types.new(name: product_type[:name], inventory: product_type[:inventory])
      end
      product.shipping_fee_per_regions.delete_all
      product_params[:prefecture_delivery_charges].each do |prefecture_delivery_charge|
        product.shipping_fee_per_regions.new(region: prefecture_delivery_charge[:region], shipping_fee: prefecture_delivery_charge[:shipping_fee])
      end
      product.save!
      product.shop_products.destroy_all
      product_params[:shops].each do |s|
        shop = Shop.find_by(public_id: s[:public_id])
        product.shop_products.create!(shop_id: shop.id)
      end
      if params[:product_image1_file].present? && !params[:product_image1_file].eql?("null")
        file_name = "product_image1_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        product.register_s3_image(file_name, params[:product_image1_file], "image1_account_s3_image_id")
      end
      if params[:product_image2_file].present? && !params[:product_image2_file].eql?("null")
        file_name = "product_image2_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        product.register_s3_image(file_name, params[:product_image2_file], "image2_account_s3_image_id")
      end
      if params[:product_image3_file].present? && !params[:product_image3_file].eql?("null")
        file_name = "product_image3_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        product.register_s3_image(file_name, params[:product_image3_file], "image3_account_s3_image_id")
      end
      if params[:product_image4_file].present? && !params[:product_image4_file].eql?("null")
        file_name = "product_image4_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        product.register_s3_image(file_name, params[:product_image4_file], "image4_account_s3_image_id")
      end
      if params[:product_image5_file].present? && !params[:product_image5_file].eql?("null")
        file_name = "product_image5_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        product.register_s3_image(file_name, params[:product_image5_file], "image5_account_s3_image_id")
      end
      product.save!
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def purchase_info
    product = Product.find_by(public_id: params[:public_id])
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
    product = JSON.parse(product.to_json(methods:
      [:product_types,
       :show_product_type_form,
       :shipping_fee_per_regions,
       :delivery_charge_type,
       :image1_account_s3_image_public_url,
       :image2_account_s3_image_public_url,
       :image3_account_s3_image_public_url,
       :image4_account_s3_image_public_url,
       :image5_account_s3_image_public_url,]))
    render json: { status: 'success',
                   product: product,
                   shared_component: shared_component,
                   payment_methods: payment_methods,
                   delivery_targets: delivery_targets,
                   default_payment_method_id: default_payment_method_id,
                   current_end_user: current_end_user.present? ? current_end_user : {},
                   login_status: login_status }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def insert_cart
    ActiveRecord::Base.transaction do
      product = Product.enabled.find_by(public_id: product_params[:public_id])
      product.cart_products.create!(
        end_user_id: current_end_user.id,
        account_id: product.account_id,
        quantity: product_params[:purchase_quantity],
        product_type_id: product_params[:product_type_id]
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
                                phone_number: product_params[:phone_number],
                                email: product_params[:email])
        delivery_target.is_default = true
        delivery_target.save!
      end
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def logical_delete
    product = Product.find_by(public_id: params[:public_id])
    product.logical_delete
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def inventory_replenishment
    if product_params[:target_type] == 'Product'
      product = Product.find_by(public_id: params[:public_id])
      product.update!(inventory: product_params[:inventory])
    else
      product_type = ProductType.find_by(public_id: params[:public_id])
      product_type.update!(inventory: product_params[:inventory])
    end
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def product_params
    JSON.parse(params.require(:product), {symbolize_names: true})[:product]
  end
end
