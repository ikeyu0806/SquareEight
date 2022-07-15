class Api::Internal::MonthlyPaymentPlansController < ApplicationController

  def index
    monthly_payment_plans = current_merchant_user.account.monthly_payment_plans
    render json: { status: 'success', monthly_payment_plans: monthly_payment_plans }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    current_merchant_user.account.monthly_payment_plans.create!(monthly_payment_plan_params)
    render json: { status: 'success' }, states: 200
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
    monthly_payment_plan.update!(monthly_payment_plan_params)
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
                                                  :enable_reserve_count)
  end
end
