class Api::Internal::EndUser::ReservationsController < ApplicationController
  before_action :end_user_login_only!

  def index
    reservations = current_end_user
                   .reservations
                   .order(id: :desc)
                   .to_json(methods: [:reserve_frame_title,
                                      :display_reservation_datetime,
                                      :display_payment_method,
                                      :display_status,
                                      :ticket_master_name,
                                      :monthly_payment_plan_name,
                                      :is_cancelable,
                                      :cancel_reception_text])
    reservations = JSON.parse(reservations)
    render json: { status: 'success', reservations: reservations }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def cancel_reservation
    reservation = Reservation.find_by(public_id: params[:public_id])
    reservation.update!(status: 'cancel')
    customer = reservation.customer
    # swal2のcheckboxにチェックを入れると"1"になる
    ReservationMailer.cancel_mail(reservation.id, customer.id).deliver_later
    render json: { status: 'success' }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end
end
