class Api::Internal::ReservationsController < ApplicationController
  def create
    ActiveRecord::Base.transaction do
      reserve_frame = ReserveFrame.find(reservation_params[:reserve_frame_id])
      # 定員オーバチェック
      capacity = reserve_frame.capacity
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def reservation_params
    params.require(:reservations)
          .permit(:id,
                  :last_name,
                  :first_name,
                  :email,
                  :phone_number,
                  :reserve_frame_id,
                  :start_at,
                  :end_at,
                  :number_of_people,
                  :end_user_id,
                  :customer_id,
                  :type,
                  :payment_method,
                  :reserve_count,
                  :price)
  end
end
