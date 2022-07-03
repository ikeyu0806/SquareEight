class Api::Internal::ReserveFramesController < ApplicationController
  before_action :login_only!

  def create
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
