class Api::Batch::ReservationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def remind_date_notifications
    day = Time.new(reservation_params[:year], reservation_params[:month], reservation_params[:day])
    reservations = Reservation.where(start_at: day.beginning_of_day..day.end_of_day)
    reservations.each do |reservation|
      ReservationMailer.remind_mail_to_customer(reservation.id).deliver_now
    end
    render json: { status: 'success' }, status: 200
  rescue => error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def reservation_params
    params.require(:reservations)
          .permit(:year, :month, :day)
  end
end
