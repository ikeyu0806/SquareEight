class Api::Internal::Account::ReservationsController < ApplicationController
  before_action :merchant_login_only!

  def index
    reservations = current_merchant_user
                   .reservations
                   .to_json(methods: [:reserve_frame_title,
                                      :display_reservation_datetime,
                                      :display_payment_method,
                                      :display_status,
                                      :ticket_master_name,
                                      :monthly_payment_plan_name])
    reservations = JSON.parse(reservations)
    render json: { status: 'success', reservations: reservations }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end
end
