class Api::Internal::Account::ReservationsController < ApplicationController
  before_action :merchant_login_only!

  def index
    target_start_date = Time.parse(params[:target_start_date])
    target_end_date = Time.parse(params[:target_end_date])
    reservations = current_merchant_user
                   .reservations.where(start_at: target_start_date.beginning_of_day..target_end_date.end_of_day)
                   .where.not(status: ['inputTimeWithPaymentMethod'])
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
                                      :reception_type,
                                      :reservation_local_payment_prices,
                                      :questionnaire_master_id,
                                      :reservation_credit_card_payment_prices])
    reservations = JSON.parse(reservations)
    render json: { status: 'success', reservations: reservations }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end
end
