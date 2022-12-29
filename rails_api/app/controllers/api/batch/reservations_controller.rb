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
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def confirm_lottery_reservation
    rng = Random.new
    current_datetime = Time.zone.now.strftime("%Y%m%d%H")
    ReserveFrame.Lottery.each do |reserve_frame|
      candidate_reservations = []
      reserve_frame.reservations.select do |r|
        if r.lottery_confirmed_day_before.strftime("%Y%m%d%H") == current_datetime
          candidate_reservations.push(r)
        end
      end
      shuffle_candidate_reservations = candidate_reservations.shuffle(random: rng)
      shuffle_candidate_reservations.first(reserve_frame.capacity).each do |r|
        r.confirm!
      end
    end
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def reservation_params
    params.require(:reservations)
          .permit(:year, :month, :day)
  end
end
