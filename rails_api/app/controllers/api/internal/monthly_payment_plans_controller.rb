include Base64Image

class Api::Internal::MonthlyPaymentPlansController < ApplicationController
  before_action :merchant_login_only!, except: [:purchase, :purchase_info, :insert_cart]
  before_action :end_user_login_only!, only: [:insert_cart]

  def index
    monthly_payment_plans = current_merchant_user.account.monthly_payment_plans.enabled.order(:id)
    # ページネーション
    current_page = params[:current_page].to_i
    display_count = params[:display_count].to_i
    last_page, remainder = monthly_payment_plans.count.divmod(display_count)
    last_page += 1 if remainder.positive?
    monthly_payment_plans = monthly_payment_plans.first(current_page * display_count).last(display_count)
    render json: { status: 'success',
                   monthly_payment_plans: monthly_payment_plans,
                   last_page: last_page }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def show
    monthly_payment_plan = MonthlyPaymentPlan.enabled.find_by(public_id: params[:public_id])
    selectable_reserve_frames = monthly_payment_plan.account.reserve_frames.enabled
    monthly_payment_plan = JSON.parse(monthly_payment_plan.to_json(methods: [
      :selected_shop_ids, 
      :selected_reserve_frame_ids,
      :image1_account_s3_image_public_url,
      :image2_account_s3_image_public_url,
      :image3_account_s3_image_public_url,
      :image4_account_s3_image_public_url,
      :image5_account_s3_image_public_url,]))
    render json: { status: 'success',
                   selectable_reserve_frames: selectable_reserve_frames,
                   monthly_payment_plan: monthly_payment_plan }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def related_data
    account = current_merchant_user.account
    selectable_reserve_frames = account.reserve_frames.enabled
    render json: { status: 'success',
                   selectable_reserve_frames: selectable_reserve_frames }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def subscribers
    monthly_payment_plan = MonthlyPaymentPlan.enabled.find_by(public_id: params[:public_id])
    merchant_stripe_subscriptions = monthly_payment_plan.merchant_stripe_subscriptions_info
    render json: { status: 'success',
                   merchant_stripe_subscriptions: merchant_stripe_subscriptions,
                   monthly_payment_plan: monthly_payment_plan }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def purchase_info
    monthly_payment_plan = MonthlyPaymentPlan.enabled.find_by(public_id: params[:public_id])
    shared_component = monthly_payment_plan.account.shared_component
    shared_component = JSON.parse(shared_component.to_json(methods: [:navbar_image_account_s3_image_public_url]))
    if current_end_user.present?
      default_payment_method_id, payment_methods = current_end_user.payment_methods
      login_status = 'Login'
    else
      default_payment_method_id = nil
      payment_methods = []
      login_status = 'Logout'
    end
    monthly_payment_plan = JSON.parse(monthly_payment_plan.to_json(
      methods: [
        :image1_account_s3_image_public_url,
        :image2_account_s3_image_public_url,
        :image3_account_s3_image_public_url,
        :image4_account_s3_image_public_url,
        :image5_account_s3_image_public_url,]))
    render json: { status: 'success',
                   shared_component: shared_component,
                   monthly_payment_plan: monthly_payment_plan,
                   payment_methods: payment_methods,
                   default_payment_method_id: default_payment_method_id,
                   login_status: login_status }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def create
    ActiveRecord::Base.transaction do
      monthly_payment_plan = current_merchant_user.account.monthly_payment_plans.new(form_type_params.except(:base64_image, :shops))
      if params[:monthly_payment_plan_image1_file].present? && !params[:monthly_payment_plan_image1_file].eql?("null")
        file_name = "monthly_payment_plan_image1_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        monthly_payment_plan.register_s3_image(file_name, params[:monthly_payment_plan_image1_file], "image1_account_s3_image_id")
      end
      if params[:monthly_payment_plan_image2_file].present? && !params[:monthly_payment_plan_image2_file].eql?("null")
        file_name = "monthly_payment_plan_image2_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        monthly_payment_plan.register_s3_image(file_name, params[:monthly_payment_plan_image2_file], "image2_account_s3_image_id")
      end
      if params[:monthly_payment_plan_image3_file].present? && !params[:monthly_payment_plan_image3_file].eql?("null")
        file_name = "monthly_payment_plan_image3_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        monthly_payment_plan.register_s3_image(file_name, params[:monthly_payment_plan_image3_file], "image3_account_s3_image_id")
      end
      if params[:monthly_payment_plan_image4_file].present? && !params[:monthly_payment_plan_image4_file].eql?("null")
        file_name = "monthly_payment_plan_image4_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        monthly_payment_plan.register_s3_image(file_name, params[:monthly_payment_plan_image4_file], "image4_account_s3_image_id")
      end
      if params[:monthly_payment_plan_image5_file].present? && !params[:monthly_payment_plan_image5_file].eql?("null")
        file_name = "monthly_payment_plan_image5_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        monthly_payment_plan.register_s3_image(file_name, params[:monthly_payment_plan_image5_file], "image5_account_s3_image_id")
      end
      Stripe.api_key = Rails.configuration.stripe[:secret_key]
      Stripe.api_version = '2022-08-01'
      product = Stripe::Product.create({
        name: form_type_params[:name]
      })
      stripe_plan = Stripe::Plan.create({
        amount: form_type_params[:price],
        currency: 'jpy',
        interval: 'month',
        nickname: form_type_params[:name],
        product: product.id,
      })
      monthly_payment_plan.stripe_plan_id = stripe_plan.id
      monthly_payment_plan.save!
      if params["reserve_frame_ids"].present?
        params["reserve_frame_ids"].each do |reserve_frame_id|
          monthly_payment_plan.reserve_frame_monthly_payment_plans.create!(reserve_frame_id: reserve_frame_id)
        end
      end
      form_type_params[:shops].each do |s|
        shop = Shop.find_by(public_id: s[:public_id])
        monthly_payment_plan.shop_monthly_payment_plans.create!(shop_id: shop.id)
      end
      monthly_payment_plan.save!
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update
    monthly_payment_plan = current_merchant_user.account.monthly_payment_plans.find_by(public_id: params[:public_id])
    monthly_payment_plan.attributes = form_type_params.except(:base64_image, :shops)
    if params[:monthly_payment_plan_image1_file].present? && !params[:monthly_payment_plan_image1_file].eql?("null")
      file_name = "monthly_payment_plan_image1_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
      monthly_payment_plan.register_s3_image(file_name, params[:monthly_payment_plan_image1_file], "image1_account_s3_image_id")
    end
    if params[:monthly_payment_plan_image2_file].present? && !params[:monthly_payment_plan_image2_file].eql?("null")
      file_name = "monthly_payment_plan_image2_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
      monthly_payment_plan.register_s3_image(file_name, params[:monthly_payment_plan_image2_file], "image2_account_s3_image_id")
    end
    if params[:monthly_payment_plan_image3_file].present? && !params[:monthly_payment_plan_image3_file].eql?("null")
      file_name = "monthly_payment_plan_image3_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
      monthly_payment_plan.register_s3_image(file_name, params[:monthly_payment_plan_image3_file], "image3_account_s3_image_id")
    end
    if params[:monthly_payment_plan_image4_file].present? && !params[:monthly_payment_plan_image4_file].eql?("null")
      file_name = "monthly_payment_plan_image4_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
      monthly_payment_plan.register_s3_image(file_name, params[:monthly_payment_plan_image4_file], "image4_account_s3_image_id")
    end
    if params[:monthly_payment_plan_image5_file].present? && !params[:monthly_payment_plan_image5_file].eql?("null")
      file_name = "monthly_payment_plan_image5_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
      monthly_payment_plan.register_s3_image(file_name, params[:monthly_payment_plan_image5_file], "image5_account_s3_image_id")
    end
    monthly_payment_plan.reserve_frame_monthly_payment_plans.destroy_all
    monthly_payment_plan.save!
    if params["reserve_frame_ids"].present?
      params["reserve_frame_ids"].each do |reserve_frame_id|
        monthly_payment_plan.reserve_frame_monthly_payment_plans.create!(reserve_frame_id: reserve_frame_id)
      end
    end
    monthly_payment_plan.save!
    monthly_payment_plan.shop_monthly_payment_plans.destroy_all
    form_type_params[:shops].each do |s|
      shop = Shop.find_by(public_id: s[:public_id])
      monthly_payment_plan.shop_monthly_payment_plans.create!(shop_id: shop.id)
    end
    monthly_payment_plan.save!
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def insert_cart
    ActiveRecord::Base.transaction do
      monthly_payment_plan = MonthlyPaymentPlan.enabled.find_by(public_id: json_type_params[:public_id])
      # 既にカートに入っていたら追加しない
      raise "既にカートに入っています" if monthly_payment_plan.cart_monthly_payment_plans.find_by(end_user_id: current_end_user.id).present?
      monthly_payment_plan.cart_monthly_payment_plans.create!(
        end_user_id: current_end_user.id,
        account_id: monthly_payment_plan.account_id,
        quantity: json_type_params[:purchase_quantity])
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def logical_delete
    monthly_payment_plan = MonthlyPaymentPlan.find_by(public_id: params[:public_id])
    monthly_payment_plan.logical_delete
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def form_type_params
    JSON.parse(params.require(:monthly_payment_plans), {symbolize_names: true})[:monthly_payment_plans]
  end

  def json_type_params
    params.require(:monthly_payment_plans).permit(:id,
                                                  :public_id,
                                                  :name,
                                                  :price,
                                                  :description,
                                                  :reserve_is_unlimited,
                                                  :reserve_interval_number,
                                                  :reserve_interval_unit,
                                                  :enable_reserve_count,
                                                  :publish_status,
                                                  :base64_image,
                                                  :purchase_quantity,
                                                  shops: [:name, :public_id])
  end
end
