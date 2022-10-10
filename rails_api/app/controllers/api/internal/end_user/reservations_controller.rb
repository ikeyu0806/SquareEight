class Api::Internal::EndUser::ReservationsController < ApplicationController
  before_action :end_user_login_only!

  def index
    reservations = current_end_user
                   .reservations
                   .to_json(methods: [:reserve_frame_title,
                                      :display_reservation_datetime,
                                      :display_payment_method,
                                      :display_status,
                                      :ticket_master_name,
                                      :monthly_payment_plan_name])
    reservations = JSON.parse(reservations)
    render json: { status: 'success', reservations: reservations }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end
end
