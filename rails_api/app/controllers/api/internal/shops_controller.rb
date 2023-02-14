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
    account = shop.account
    products = account.products.enabled
    ticket_masters = account.ticket_masters.enabled
    monthly_payment_plans = account.monthly_payment_plans.enabled
    reserve_frames = account.reserve_frames.enabled
    webpages = account.webpages
    resources = account.resources
  
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
                                    :products_info,
                                    :staff_resources_info,
                                    :equipment_resources_info,
                                    :selected_product_ids,
                                    :selected_monthly_payment_plan_ids,
                                    :selected_ticket_master_ids,
                                    :selected_webpage_ids,
                                    :selected_reserve_frame_ids,
                                    :selected_resource_ids])
    shop = JSON.parse(shop)
    render json: { status: 'success',
                   shop: shop,
                   products: products,
                   ticket_masters: ticket_masters,
                   monthly_payment_plans: monthly_payment_plans,
                   reserve_frames: reserve_frames,
                   webpages: webpages,
                   resources: resources,
                   shared_component: shared_component }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def related_data
    account = current_merchant_user.account
    products = account.products.enabled
    ticket_masters = account.ticket_masters.enabled
    monthly_payment_plans = account.monthly_payment_plans.enabled
    reserve_frames = account.reserve_frames.enabled
    webpages = account.webpages
    resources = account.resources
    render json: { status: 'success',
                   products: products,
                   ticket_masters: ticket_masters,
                   monthly_payment_plans: monthly_payment_plans,
                   reserve_frames: reserve_frames,
                   webpages: webpages,
                   resources: resources }, status: 200
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
      shop.description3 = params[:description3]
      shop.description4 = params[:description4]
      shop.description5 = params[:description5]
      shop.description6 = params[:description6]
      shop.postal_code = params[:postal_code]
      shop.state = params[:state]
      shop.city = params[:city]
      shop.town = params[:town]
      shop.line1 = params[:line1]
      shop.line2 = params[:line2]
      shop.access_info = params[:access_info]
      shop.business_hours_text = params[:business_hours_text]
      shop.parking_lot_guidance = params[:parking_lot_guidance]
      shop.remarks = params[:remarks]
      shop.publish_status = params[:publish_status]
      shop.save!
      if params[:shop_image1_file].present? && !params[:shop_image1_file].eql?("null")
        shop.register_s3_image(params[:shop_image1_file], "shop_image1_account_s3_image_id")
      end
      if params[:shop_image2_file].present? && !params[:shop_image2_file].eql?("null")
        shop.register_s3_image(params[:shop_image2_file], "shop_image2_account_s3_image_id")
      end
      if params[:shop_image3_file].present? && !params[:shop_image3_file].eql?("null")
        shop.register_s3_image(params[:shop_image3_file], "shop_image3_account_s3_image_id")
      end
      if params[:shop_image4_file].present? && !params[:shop_image4_file].eql?("null")
        shop.register_s3_image(params[:shop_image4_file], "shop_image4_account_s3_image_id")
      end
      if params[:shop_image5_file].present? && !params[:shop_image5_file].eql?("null")
        shop.register_s3_image(params[:shop_image5_file], "shop_image5_account_s3_image_id")
      end
      if params[:shop_image6_file].present? && !params[:shop_image6_file].eql?("null")
        shop.register_s3_image(params[:shop_image6_file], "shop_image6_account_s3_image_id")
      end
      if params["reserve_frame_ids"].present?
        params["reserve_frame_ids"].each do |reserve_frame_id|
          shop.shop_reserve_frames.create!(reserve_frame_id: reserve_frame_id)
        end
      end
      if params["ticket_master_ids"].present?
        params["ticket_master_ids"].each do |ticket_master_id|
          shop.shop_ticket_masters.create!(ticket_master_id: ticket_master_id)
        end
      end
      if params["monthly_payment_plan_ids"].present?
        params["monthly_payment_plan_ids"].each do |monthly_payment_plan_id|
          shop.shop_monthly_payment_plans.create!(monthly_payment_plan_id: monthly_payment_plan_id)
        end
      end
      if params["product_ids"].present?
        params["product_ids"].each do |product_id|
          shop.shop_products.create!(product_id: product_id)
        end
      end
      if params["webpage_ids"].present?
        params["webpage_ids"].each do |webpage_id|
          shop.shop_webpages.create!(webpage_id: webpage_id)
        end
      end
      if params["resource_ids"].present?
        params["resource_ids"].each do |resource_id|
          shop.shop_resources.create!(resource_id: resource_id)
        end
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
      shop.description3 = params[:description3]
      shop.description4 = params[:description4]
      shop.description5 = params[:description5]
      shop.description6 = params[:description6]
      shop.postal_code = params[:postal_code]
      shop.state = params[:state]
      shop.city = params[:city]
      shop.town = params[:town]
      shop.line1 = params[:line1]
      shop.line2 = params[:line2]
      shop.access_info = params[:access_info]
      shop.business_hours_text = params[:business_hours_text]
      shop.parking_lot_guidance = params[:parking_lot_guidance]
      shop.remarks = params[:remarks]
      shop.publish_status = params[:publish_status]
      shop.save!
      if params[:shop_image1_file].present? && !params[:shop_image1_file].eql?("null")
        shop.register_s3_image(params[:shop_image1_file], "shop_image1_account_s3_image_id")
      end
      if params[:shop_image2_file].present? && !params[:shop_image2_file].eql?("null")
        shop.register_s3_image(params[:shop_image2_file], "shop_image2_account_s3_image_id")
      end
      if params[:shop_image3_file].present? && !params[:shop_image3_file].eql?("null")
        shop.register_s3_image(params[:shop_image3_file], "shop_image3_account_s3_image_id")
      end
      if params[:shop_image4_file].present? && !params[:shop_image4_file].eql?("null")
        shop.register_s3_image(params[:shop_image4_file], "shop_image4_account_s3_image_id")
      end
      if params[:shop_image5_file].present? && !params[:shop_image5_file].eql?("null")
        shop.register_s3_image(params[:shop_image5_file], "shop_image5_account_s3_image_id")
      end
      if params[:shop_image6_file].present? && !params[:shop_image6_file].eql?("null")
        shop.register_s3_image(params[:shop_image6_file], "shop_image6_account_s3_image_id")
      end
      shop.shop_reserve_frames.destroy_all
      if params["reserve_frame_ids"].present?
        params["reserve_frame_ids"].each do |reserve_frame_id|
          shop.shop_reserve_frames.create!(reserve_frame_id: reserve_frame_id)
        end
      end
      shop.shop_ticket_masters.destroy_all
      if params["ticket_master_ids"].present?
        params["ticket_master_ids"].each do |ticket_master_id|
          shop.shop_ticket_masters.create!(ticket_master_id: ticket_master_id)
        end
      end
      shop.shop_monthly_payment_plans.destroy_all
      if params["monthly_payment_plan_ids"].present?
        params["monthly_payment_plan_ids"].each do |monthly_payment_plan_id|
          shop.shop_monthly_payment_plans.create!(monthly_payment_plan_id: monthly_payment_plan_id)
        end
      end
      shop.shop_products.destroy_all
      if params["product_ids"].present?
        params["product_ids"].each do |product_id|
          shop.shop_products.create!(product_id: product_id)
        end
      end
      shop.shop_webpages.destroy_all
      if params["webpage_ids"].present?
        params["webpage_ids"].each do |webpage_id|
          shop.shop_webpages.create!(webpage_id: webpage_id)
        end
      end
      shop.shop_resources.destroy_all
      if params["resource_ids"].present?
        params["resource_ids"].each do |resource_id|
          shop.shop_resources.create!(resource_id: resource_id)
        end
      end
      shop.save!
    end
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def destroy
    shop = Shop.find_by(public_id: params[:public_id])
    shop.shop_reserve_frames.destroy_all
    shop.shop_ticket_masters.destroy_all
    shop.shop_monthly_payment_plans.destroy_all
    shop.shop_products.destroy_all
    shop.shop_webpages.destroy_all
    shop.shop_resources.destroy_all
    shop.destroy
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
