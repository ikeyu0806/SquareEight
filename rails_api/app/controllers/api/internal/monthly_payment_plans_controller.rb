include Base64Image

class Api::Internal::MonthlyPaymentPlansController < ApplicationController
  before_action :merchant_login_only!, except: [:index, :show, :purchase, :purchase_info, :insert_cart]

  def index
    monthly_payment_plans = current_merchant_user.account.monthly_payment_plans.order(:id)
    render json: { status: 'success', monthly_payment_plans: monthly_payment_plans }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def show
    monthly_payment_plan = current_merchant_user.account.monthly_payment_plans.find(params[:id])
    render json: { status: 'success', monthly_payment_plan: monthly_payment_plan }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def purchase_info
    monthly_payment_plan = MonthlyPaymentPlan.find(params[:id])
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
                   monthly_payment_plan: monthly_payment_plan,
                   payment_methods: payment_methods,
                   default_payment_method_id: default_payment_method_id,
                   login_status: login_status }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    ActiveRecord::Base.transaction do
      monthly_payment_plan = current_merchant_user.account.monthly_payment_plans.new(monthly_payment_plan_params.except(:base64_image))
      if monthly_payment_plan_params[:base64_image].present?
        file_name = "monthly_paymeny_plan_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        monthly_payment_plan.s3_object_public_url = put_s3_http_request_data(monthly_payment_plan_params[:base64_image], ENV["PRODUCT_IMAGE_BUCKET"], file_name)
        monthly_payment_plan.s3_object_name = file_name
      end
      Stripe.api_key = Rails.configuration.stripe[:secret_key]
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
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update
    monthly_payment_plan = current_merchant_user.account.monthly_payment_plans.find(params[:id])
    monthly_payment_plan.attributes = monthly_payment_plan_params.except(:base64_image)
    if (monthly_payment_plan_params[:base64_image].present?)
      monthly_payment_plan.delete_s3_image if monthly_payment_plan.s3_object_public_url.present?
      file_name = "monthly_paymeny_plan_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
      monthly_payment_plan.s3_object_public_url = put_s3_http_request_data(monthly_payment_plan_params[:base64_image], ENV["PRODUCT_IMAGE_BUCKET"], file_name)
      monthly_payment_plan.s3_object_name = file_name
    end
    monthly_payment_plan.save!
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def insert_cart
    ActiveRecord::Base.transaction do
      monthly_payment_plan = MonthlyPaymentPlan.find(monthly_payment_plan_params[:id])
      # 既にカートに入っていたら追加しない
      raise "既にカートに入っています" if monthly_payment_plan.cart_monthly_payment_plans.find_by(end_user_id: current_end_user.id).present?
      monthly_payment_plan.cart_monthly_payment_plans.create!(
        end_user_id: current_end_user.id,
        account_id: monthly_payment_plan.account_id,
        quantity: monthly_payment_plan_params[:purchase_quantity])
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def monthly_payment_plan_params
    params.require(:monthly_payment_plans).permit(:id,
                                                  :name,
                                                  :price,
                                                  :description,
                                                  :reserve_is_unlimited,
                                                  :reserve_interval_number,
                                                  :reserve_interval_unit,
                                                  :enable_reserve_count,
                                                  :publish_status,
                                                  :base64_image,
                                                  :purchase_quantity)
  end
end
