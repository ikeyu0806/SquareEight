class Api::Internal::ReserveFramesController < ApplicationController
  before_action :login_only!

  def create
    current_merchant_user.account.reserve_frames.create!(reserve_frame_params)
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def reserve_frame_params
    params.require(:reserve_frames)
          .permit(:id,
                  :start_at,
                  :end_at,
                  :title,
                  :is_repeat,
                  :repeat_interval,
                  ;capacity,
                  :local_payment_price,
                  :publish_status,
                  :reception_type,
                  :reception_start_day_before,
                  :cancel_reception,
                  :cancel_reseption_day_before)
  end
end
