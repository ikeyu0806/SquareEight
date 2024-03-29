include Base64Image

class Api::Internal::ProductsController < ApplicationController
  before_action :merchant_login_only!, only: [:index, :create, :update, :logical_delete]
  before_action :end_user_login_only!, only: [:insert_cart]

  def index
    # ページネーション
    current_page = params[:current_page].to_i
    display_count = params[:display_count].to_i
    products = current_merchant_user.account.products.enabled.order(:id)
    last_page, remainder = products.count.divmod(display_count)
    last_page += 1 if remainder.positive?
    products = JSON.parse(products.first(current_page * display_count).last(display_count).to_json(methods: [:product_types, :show_product_type_form]))
    render json: { status: 'success', products: products, last_page: last_page }, status: 200
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
      product = current_merchant_user.account.products.new(form_type_params.except(:base64_image, :product_types, :prefecture_delivery_charges, :shops))
      if form_type_params[:product_types].present?
        form_type_params[:product_types].each do |product_type|
          product.product_types.new(name: product_type[:name], inventory: product_type[:inventory])
        end
      end
      if form_type_params[:prefecture_delivery_charges].present?
        form_type_params[:prefecture_delivery_charges].each do |prefecture_delivery_charge|
          product.shipping_fee_per_regions.new(region: prefecture_delivery_charge[:region], shipping_fee: prefecture_delivery_charge[:shipping_fee])
        end
      end
      product.save!
      if form_type_params[:shops].present?
        form_type_params[:shops].each do |s|
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
      product.attributes = (form_type_params.except(:base64_image, :product_types, :prefecture_delivery_charges, :shops))
      product.product_types.delete_all
      form_type_params[:product_types].each do |product_type|
        product.product_types.new(name: product_type[:name], inventory: product_type[:inventory])
      end
      product.shipping_fee_per_regions.delete_all
      form_type_params[:prefecture_delivery_charges].each do |prefecture_delivery_charge|
        product.shipping_fee_per_regions.new(region: prefecture_delivery_charge[:region], shipping_fee: prefecture_delivery_charge[:shipping_fee])
      end
      product.save!
      product.shop_products.destroy_all
      form_type_params[:shops].each do |s|
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
    shared_component = JSON.parse(shared_component.to_json(methods: [:navbar_image_account_s3_image_public_url]))
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
      product = Product.enabled.find_by(public_id: json_type_params[:public_id])
      product.cart_products.create!(
        end_user_id: current_end_user.id,
        account_id: product.account_id,
        quantity: json_type_params[:purchase_quantity],
        product_type_id: json_type_params[:product_type_id]
      )
      if (json_type_params[:is_registered_address] == false)
        delivery_target = current_end_user
                          .delivery_targets
                          .new( first_name: json_type_params[:first_name],
                                last_name: json_type_params[:last_name],
                                postal_code: json_type_params[:postal_code],
                                state: json_type_params[:state],
                                city: json_type_params[:city],
                                town: json_type_params[:town],
                                line1: json_type_params[:line1],
                                line2: json_type_params[:line2],
                                phone_number: json_type_params[:phone_number],
                                email: json_type_params[:email])
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
    if form_type_params[:target_type] == 'Product'
      product = Product.find_by(public_id: params[:public_id])
      product.update!(inventory: form_type_params[:inventory])
    else
      product_type = ProductType.find_by(public_id: params[:public_id])
      product_type.update!(inventory: form_type_params[:inventory])
    end
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def form_type_params
    JSON.parse(params.require(:product), {symbolize_names: true})[:product]
  end

  def json_type_params
    params.require(:product)
          .permit(:id,
                  :public_id,
                  :name,
                  :price,
                  :tax_rate,
                  :product_type_id,
                  :inventory,
                  :description,
                  :image1_account_s3_image_public_url,
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
                  :email,
                  :publish_status,
                  :delivery_charge_type,
                  :flat_rate_delivery_charge,
                  :delivery_charge_with_order_number,
                  :delivery_datetime_target_flg,
                  :target_type,
                  :shipped_count)
  end
end
