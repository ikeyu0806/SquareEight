class Api::Internal::ResourcesController < ApplicationController
  before_action :login_only!

  def index
    resources = current_merchant_user.account.resources
    render json: { status: 'success', resources: resources }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def edit
    resource = current_merchant_user.account.resources.find(params[:id])
    render json: { status: 'success', resource: resource }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    current_merchant_user.account.resources.create!(resource_params)
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def resource_params
    params.require(:resources)
          .permit(:id,
                  :name,
                  :quantity,
                  :reception_time_setting,
                  :mon_start,
                  :mon_end,
                  :tue_start,
                  :tue_end,
                  :wed_start,
                  :wed_end,
                  :thu_start,
                  :thu_end,
                  :fri_start,
                  :fri_end,
                  :sat_start,
                  :sat_end,
                  :sun_start,
                  :sun_end,
                  :holiday_start,
                  :holiday_end,
                  :mon_break_start,
                  :mon_break_end,
                  :tue_break_start,
                  :tue_break_end,
                  :wed_break_start,
                  :wed_break_end,
                  :thu_break_start,
                  :thu_break_end,
                  :fri_break_start,
                  :fri_break_end,
                  :sat_break_start,
                  :sat_break_end,
                  :sun_break_start,
                  :sun_break_end,
                  :holiday_break_start,
                  :holiday_break_end)
  end
end
