class Api::Internal::MonthlyPaymentPlansController < ApplicationController
  def create
    MonthlyPaymentPlan.create!(monthly_payment_plan_params)
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def monthly_payment_plan_params
    params.require(:monthly_payment_plans).permit(:id,
                                                  :price,
                                                  :reserve_is_unlimited,
                                                  :reserve_interval_number,
                                                  :reserve_interval_unit,
                                                  :enable_reserve_count)
  end
end
