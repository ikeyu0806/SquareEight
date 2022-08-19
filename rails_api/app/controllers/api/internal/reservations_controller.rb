class Api::Internal::ReservationsController < ApplicationController
  def create
  end

  private

  def reserve_frame_params
    params.require(:reserve_frame)
          .permit(:id,
                  :reserve_page_id,
                  :start_at,
                  :end_at,
                  :number_of_people,
                  :end_user_id,
                  :customer_id,
                  :type,
                  :payment_method,
                  :price)
  end
end
