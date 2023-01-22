include Base64Image

class Api::Internal::MonthlyPaymentPlansController < ApplicationController
  before_action :merchant_login_only!, except: [:purchase, :purchase_info, :insert_cart]
  before_action :end_user_login_only!, only: [:insert_cart]

  def index
    monthly_payment_plans = current_merchant_user.account.monthly_payment_plans.enabled.order(:id)
    render json: { status: 'success', monthly_payment_plans: monthly_payment_plans }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def show
    monthly_payment_plan = current_merchant_user.account.monthly_payment_plans.enabled.find_by(public_id: params[:public_id])
    monthly_payment_plan = JSON.parse(monthly_payment_plan.to_json(methods: [:selected_shop_ids, :image1_account_s3_image_public_url]))
    render json: { status: 'success', monthly_payment_plan: monthly_payment_plan }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def purchase_info
    monthly_payment_plan = MonthlyPaymentPlan.enabled.find_by(public_id: params[:public_id])
    main_image_public_url = monthly_payment_plan.main_image_public_url
    shared_component = monthly_payment_plan.account.shared_component
    if current_end_user.present?
      default_payment_method_id, payment_methods = current_end_user.payment_methods
      login_status = 'Login'
    else
      default_payment_method_id = nil
      payment_methods = []
      login_status = 'Logout'
    end
    render json: { status: 'success',
                   shared_component: shared_component,
                   main_image_public_url: main_image_public_url,
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
      monthly_payment_plan = current_merchant_user.account.monthly_payment_plans.new(monthly_payment_plan_params.except(:base64_image, :shops))
      if monthly_payment_plan_params[:base64_image].present?
        file_name = "ticket_master_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        account_image = AccountS3Image.new
        account_image.account = current_merchant_user.account
        account_image.s3_object_public_url = put_s3_http_request_base64_data(monthly_payment_plan_params[:base64_image], ENV["PRODUCT_IMAGE_BUCKET"], file_name)
        account_image.s3_object_name = file_name
        account_image.save!
        monthly_payment_plan.image1_account_s3_image_id = account_image.id
      end
      Stripe.api_key = Rails.configuration.stripe[:secret_key]
      Stripe.api_version = '2022-08-01'
      product = Stripe::Product.create({
        name: monthly_payment_plan_params[:name]
      })
      stripe_plan = Stripe::Plan.create({
        amount: monthly_payment_plan_params[:price],
        currency: 'jpy',
        interval: 'month',
        nickname: monthly_payment_plan_params[:name],
        product: product.id,
      })
      monthly_payment_plan.stripe_plan_id = stripe_plan.id
      monthly_payment_plan.save!
      monthly_payment_plan_params[:shops].each do |s|
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
    monthly_payment_plan.attributes = monthly_payment_plan_params.except(:base64_image, :shops)
    if (monthly_payment_plan_params[:base64_image].present?)
      file_name = "ticket_master_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
      account_image = AccountS3Image.new
      account_image.account = current_merchant_user.account
      account_image.s3_object_public_url = put_s3_http_request_base64_data(monthly_payment_plan_params[:base64_image], ENV["PRODUCT_IMAGE_BUCKET"], file_name)
      account_image.s3_object_name = file_name
      account_image.save!
      monthly_payment_plan.image1_account_s3_image_id = account_image.id
    end
    monthly_payment_plan.save!
    monthly_payment_plan.shop_monthly_payment_plans.delete_all
    monthly_payment_plan_params[:shops].each do |s|
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
      monthly_payment_plan = MonthlyPaymentPlan.enabled.find_by(public_id: monthly_payment_plan_params[:public_id])
      # 既にカートに入っていたら追加しない
      raise "既にカートに入っています" if monthly_payment_plan.cart_monthly_payment_plans.find_by(end_user_id: current_end_user.id).present?
      monthly_payment_plan.cart_monthly_payment_plans.create!(
        end_user_id: current_end_user.id,
        account_id: monthly_payment_plan.account_id,
        quantity: monthly_payment_plan_params[:purchase_quantity])
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

  def monthly_payment_plan_params
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
