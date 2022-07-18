include Base64Image

class Api::Internal::MonthlyPaymentPlansController < ApplicationController
  before_action :login_only!

  def index
    monthly_payment_plans = current_merchant_user.account.monthly_payment_plans.order(:id)
    render json: { status: 'success', monthly_payment_plans: monthly_payment_plans }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    ActiveRecord::Base.transaction do
      monthly_payment_plan = current_merchant_user.account.monthly_payment_plans.new(monthly_payment_plan_params.except(:base64_image))
      file_name = "monthly_paymeny_plan_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
      monthly_payment_plan.s3_object_public_url = put_s3_http_request_data(monthly_payment_plan_params[:base64_image], ENV["PRODUCT_IMAGE_BUCKET"], file_name)
      monthly_payment_plan.s3_object_name = file_name
      monthly_payment_plan.save!
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def show
    monthly_payment_plan = current_merchant_user.account.monthly_payment_plans.find(params[:id])
    render json: { status: 'success', monthly_payment_plan: monthly_payment_plan }, states: 200
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
