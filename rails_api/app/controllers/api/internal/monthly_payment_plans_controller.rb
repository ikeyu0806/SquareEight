include Base64Image

class Api::Internal::MonthlyPaymentPlansController < ApplicationController
  before_action :merchant_login_only!, except: [:index, :show, :purchase, :purchase_info]
  before_action :end_user_login_only!, only: :purchase

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
    if current_end_user.present?
      default_payment_method_id, payment_methods = current_end_user.payment_methods
      login_status = 'Login'
    else
      default_payment_method_id = nil
      payment_methods = []
      login_status = 'Logout'
    end
    render json: { status: 'success',
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
      product = Stripe::Product.create({name: monthly_payment_plan_params[:name]})
      stripe_plan = Stripe::Plan.create({
        amount: monthly_payment_plan_params[:price],
        currency: 'jpy',
        interval: 'month',
        nickname: monthly_payment_plan_params[:name],
        product: product.id
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

  def purchase
    ActiveRecord::Base.transaction do
      monthly_payment_plan = MonthlyPaymentPlan.find(monthly_payment_plan_params[:id])
      customer = Stripe::Customer.retrieve(current_end_user.stripe_customer_id)
      Stripe.api_key = Rails.configuration.stripe[:secret_key]
      Stripe::Subscription.create({
        customer: current_end_user.stripe_customer_id,
        application_fee_percent: 4,
        description: monthly_payment_plan.name,
        metadata: {
          'account_business_name': monthly_payment_plan.account.business_name,
          'name': monthly_payment_plan.name,
          'price': monthly_payment_plan.price,
          'customer': current_end_user.stripe_customer_id
        },
        items: [{ plan: monthly_payment_plan.stripe_plan_id }],
        transfer_data:  {
          destination: monthly_payment_plan.account.stripe_account_id
        }
      })
      order = current_end_user.orders.new(account_id: monthly_payment_plan.account_id)
      order.order_items.new(product_type: 'MonthlyPaymentPlan',
                            monthly_payment_plan_id: monthly_payment_plan.id,
                            product_name: monthly_payment_plan.name,
                            price: monthly_payment_plan.price,
                            commission: (monthly_payment_plan.price * 0.04).to_i)
      order.save!
      render json: { status: 'success', order_id: order.id }, states: 200
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
                                                  :base64_image)
  end
end
