class Api::Internal::Account::ReservationsController < ApplicationController
  before_action :merchant_login_only!

  def index
    target_date = Time.parse(params[:target_date])
    reservations = current_merchant_user
                   .reservations.where(start_at: target_date.beginning_of_day..target_date.end_of_day)
                   .order(start_at: :desc)
                   .to_json(methods: [:reserve_frame_title,
                                      :display_reservation_datetime,
                                      :display_payment_method,
                                      :display_status,
                                      :ticket_master_name,
                                      :monthly_payment_plan_name,
                                      :customer_name,
                                      :customer_email,
                                      :customer_phone_number,
                                      :reception_type])
    reservations = JSON.parse(reservations)
    render json: { status: 'success', reservations: reservations }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end
end
