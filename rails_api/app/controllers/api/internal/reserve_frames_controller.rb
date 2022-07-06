class Api::Internal::ReserveFramesController < ApplicationController
  before_action :login_only!

  def create
    reserve_frame = current_merchant_user.account.reserve_frames.new(reserve_frame_params.except(:unreservable_frames, :resource_ids))
    reserve_frame_params[:unreservable_frames].each do |frame|
      reserve_frame.unreservable_frames.new(start_at: frame[:start_at], end_at: frame[:end_at])
    end
    if reserve_frame_params[:resource_ids].present?
      reserve_frame.reserve_frame_resorces.delete_all
      reserve_frame_params[:resource_ids].each do |resource_id|
        reserve_frame.reserve_frame_resorces.new(resource_id: resource_id)
      end
    end
    reserve_frame.save!
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def reserve_frame_params
    params.require(:reserve_frame)
          .permit(:id,
                  :start_at,
                  :end_at,
                  :title,
                  :description,
                  :is_repeat,
                  :repeat_interval_type,
                  :repeat_interval_number_day,
                  :repeat_interval_number_week,
                  :repeat_interval_number_month,
                  :repeat_interval_month_date,
                  :capacity,
                  :local_payment_price,
                  :publish_status,
                  :reception_type,
                  :reception_start_day_before,
                  :cancel_reception,
                  :cancel_reseption_hour_before,
                  :cancel_reseption_day_before,
                  resource_ids: [],
                  unreservable_frames: [:start_at, :end_at])
  end
end
