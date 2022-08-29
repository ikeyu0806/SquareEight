class Api::Internal::SpecialHolidaysController < ApplicationController
  before_action :merchant_login_only!

  def index
    datetimes = current_merchant_user
                .account
                .special_holidays
                .to_json(methods: [:date, :start_time, :end_time])
    datetimes = JSON.parse(datetimes)
    render json: { status: 'success', datetimes: datetimes }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    current_merchant_user.account.special_holidays.delete_all
    special_holiday_params[:datetimes].each do |param|
      year = param["date"].split("-")[0].to_i
      month = param["date"].split("-")[1].to_i
      day = param["date"].split("-")[2].to_i

      start_hour = param["start_time"].split(":")[0].to_i
      start_minutes = param["start_time"].split(":")[1].to_i
      start_at = DateTime.new(year, month, day, start_hour, start_minutes, 0, "+09:00")

      end_hour = param["end_time"].split(":")[0].to_i
      end_minutes = param["end_time"].split(":")[1].to_i
      end_at = DateTime.new(year, month, day, start_hour, start_minutes, 0, "+09:00")

      current_merchant_user.account
      .special_holidays.create!(start_at: start_at, end_at: end_at, manage_id: param["manage_id"])
    end
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def special_holiday_params
    params.require(:special_holiday)
          .permit(:id,
                  datetimes: [:date,
                              :start_time,
                              :end_time,
                              :manage_id])
  end
end
