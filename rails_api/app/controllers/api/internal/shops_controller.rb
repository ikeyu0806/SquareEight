class Api::Internal::ShopsController < ApplicationController
  before_action :merchant_login_only!, except: [:show]

  def index
    shops = current_merchant_user.account.shops
    render json: { status: 'success', shops: shops }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def show
    shop = Shop
           .find_by(public_id: params[:public_id])

    shared_component = shop.account.shared_component
    shop = shop.to_json(methods: [  :shop_image1_public_url,
                                    :shop_image2_public_url,
                                    :shop_image3_public_url,
                                    :shop_image4_public_url,
                                    :shop_image5_public_url,
                                    :shop_image6_public_url,
                                    :reserve_frames_info,
                                    :monthly_payment_plans_info,
                                    :ticket_masters_info,
                                    :products_info])
    shop = JSON.parse(shop)
    render json: { status: 'success', shop: shop, shared_component: shared_component }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def create
    ActiveRecord::Base.transaction do
      shop = current_merchant_user.account.shops.new
      shop.name = params[:name]
      shop.phone_number = params[:phone_number]
      shop.description1 = params[:description1]
      shop.description2 = params[:description2]
      shop.description2 = params[:description3]
      shop.description2 = params[:description4]
      shop.description2 = params[:description5]
      shop.description2 = params[:description6]
      shop.postal_code = params[:postal_code]
      shop.state = params[:state]
      shop.city = params[:city]
      shop.town = params[:town]
      shop.line1 = params[:line1]
      shop.line2 = params[:line2]
      shop.access_info = params[:access_info]
      shop.business_hours_text = params[:business_hours_text]
      shop.parking_lot_guidance = params[:parking_lot_guidance]
      shop.save!
      if params[:shop_image1_file].present?
        shop.register_s3_image(params[:shop_image1_file], "shop_image1_account_s3_image_id")
      end
      if params[:shop_image2_file].present?
        shop.register_s3_image(params[:shop_image2_file], "shop_image2_account_s3_image_id")
      end
      if params[:shop_image3_file].present?
        shop.register_s3_image(params[:shop_image3_file], "shop_image3_account_s3_image_id")
      end
      if params[:shop_image4_file].present?
        shop.register_s3_image(params[:shop_image4_file], "shop_image4_account_s3_image_id")
      end
      if params[:shop_image5_file].present?
        shop.register_s3_image(params[:shop_image5_file], "shop_image5_account_s3_image_id")
      end
      if params[:shop_image6_file].present?
        shop.register_s3_image(params[:shop_image6_file], "shop_image6_account_s3_image_id")
      end
      shop.save!
    end
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update
    ActiveRecord::Base.transaction do
      shop = current_merchant_user.account.shops.find_by(public_id: params[:public_id])
      shop.name = params[:name]
      shop.phone_number = params[:phone_number]
      shop.description1 = params[:description1]
      shop.description2 = params[:description2]
      shop.description2 = params[:description3]
      shop.description2 = params[:description4]
      shop.description2 = params[:description5]
      shop.description2 = params[:description6]
      shop.postal_code = params[:postal_code]
      shop.state = params[:state]
      shop.city = params[:city]
      shop.town = params[:town]
      shop.line1 = params[:line1]
      shop.line2 = params[:line2]
      shop.access_info = params[:access_info]
      shop.business_hours_text = params[:business_hours_text]
      shop.parking_lot_guidance = params[:parking_lot_guidance]
      shop.save!
      if params[:shop_image1_file].present?
        shop.register_s3_image(params[:shop_image1_file], "shop_image1_account_s3_image_id")
      end
      if params[:shop_image2_file].present?
        shop.register_s3_image(params[:shop_image2_file], "shop_image2_account_s3_image_id")
      end
      if params[:shop_image3_file].present?
        shop.register_s3_image(params[:shop_image3_file], "shop_image3_account_s3_image_id")
      end
      if params[:shop_image4_file].present?
        shop.register_s3_image(params[:shop_image4_file], "shop_image4_account_s3_image_id")
      end
      if params[:shop_image5_file].present?
        shop.register_s3_image(params[:shop_image5_file], "shop_image5_account_s3_image_id")
      end
      if params[:shop_image6_file].present?
        shop.register_s3_image(params[:shop_image6_file], "shop_image6_account_s3_image_id")
      end
      shop.save!
    end
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
