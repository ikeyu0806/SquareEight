class Api::Internal::SpecialBusinessHoursController < ApplicationController
  before_action :merchant_login_only!

  def create
    current_merchant_user.account.special_business_hours.delete_all
    special_business_hour_params[:datetimes].each do |param|
      binding.pry
      current_merchant_user.account.special_business_hours.create!(:param)
    end
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def special_business_hour_params
    params.require(:special_business_hour)
          .permit(:id,
                  datetimes: [:date, :time, :manage_id])
end
