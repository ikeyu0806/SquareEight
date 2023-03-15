class Api::Internal::EndUser::ReservationsController < ApplicationController
  before_action :end_user_login_only!

  def index
    # ページネーション
    current_page = params[:current_page].to_i
    display_count = params[:display_count].to_i
    reservations = current_end_user.reservations
    last_page, remainder = reservations.count.divmod(display_count)
    last_page += 1 if remainder.positive?
    reservations = reservations.order(start_at: :desc).first(current_page * display_count).last(display_count)
    reservations = reservations
                   .to_json(methods: [:reserve_frame_title,
                                      :display_reservation_datetime,
                                      :display_payment_method,
                                      :display_status,
                                      :ticket_master_name,
                                      :monthly_payment_plan_name,
                                      :is_cancelable,
                                      :ticket_consume_number,
                                      :cancel_reception_text])
    reservations = JSON.parse(reservations)
    render json: { status: 'success', reservations: reservations, last_page: last_page }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def cancel_reservation
    reservation = Reservation.find_by(public_id: params[:public_id])
    reservation.update!(status: 'cancel')
    customer = reservation.customer
    # ビジネスオーナー向け通知
    ReservationMailer.cancel_mail_to_merchant(reservation.id, customer.id).deliver_now
    account_notification_title = customer.full_name + 'が' + '予約をキャンセルしました'
    account_notification_url = '/admin/reservation/'
    reservation.account
    .account_notifications
    .create!(title: account_notification_title, url: account_notification_url)
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
