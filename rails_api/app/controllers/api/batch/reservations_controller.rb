class Api::Batch::ReservationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def remind_tommorow_notifications
    target_reservations = []
    tomorrow_day = Date.tomorrow
    reservations = Reservation.where(start_at: tomorrow_day.beginning_of_day..tomorrow_day.end_of_day)
    reservations.each do |reservation|
      next if reservation.customer.blank?
      next if reservation.customer.email.blank?
      ReservationMailer.remind_mail_to_customer(reservation.id).deliver_now
      target_reservations.push(reservation)
    end
    render json: { status: 'success', target_reservations: target_reservations }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def confirm_lottery_reservations
    ActiveRecord::Base.transaction do
      total_confirmed_reservations = {}
      total_lottery_lost_reservations = {}
      rng = Random.new
      current_datetime = Time.zone.now.strftime("%Y%m%d%H")
      ReserveFrame.Lottery.each do |reserve_frame|
        candidate_reservations = []
        confirmed_reservations = []
        lottery_lost_reservations = []
        account = reserve_frame.account
        account_notification_title = reserve_frame.title + 'の抽選を実行しました'
        account_notification_url = ENV['FRONTEND_URL'] + '/admin/reservation'
        reserve_frame.reservations.waitingForLotteryConfirm.each do |r|
          if r.lottery_confirmed_day_before_datetime.strftime("%Y%m%d%H") == current_datetime
            candidate_reservations.push(r)
          end
        end
        if candidate_reservations.present?
          customer_notification_title = reserve_frame.title + 'の抽選結果'
          customer_notification_url = ENV['FRONTEND_URL'] + '/customer_page/reservation'
          shuffle_candidate_reservations = candidate_reservations.shuffle(random: rng)
          # 予約受付数
          capacity = reserve_frame.capacity
          confirm_reservation_capacity_count = 0
          shuffle_candidate_reservations.each do |reservation|
            confirm_reservation_capacity_count = confirm_reservation_capacity_count += reservation.number_of_people
            reservation.confirm!
            # 支払い実行
            reservation.exec_payment
            account.merchant_users.allow_read_reservation_Allow.each do |merchant_user|
              ReservationMailer.confirm_lottery_reservation_mail_to_merchant(reservation.id, merchant_user.id).deliver_now
            end
            account.account_notifications
            .create!(title: account_notification_title, url: account_notification_url)
            ReservationMailer.confirm_lottery_reservation_mail_to_customer(reservation.id).deliver_now
            if reservation.end_user.present?
              reservation.end_user.end_user_notifications
              .create!(title: customer_notification_title, url: customer_notification_url)
            end
            confirmed_reservations.push(reservation)
            shuffle_candidate_reservations.delete(reservation)
            break if confirm_reservation_capacity_count >= reserve_frame.capacity
          end
          shuffle_candidate_reservations.each do |reservation|
            reservation.lostLottery!
            ReservationMailer.confirm_lottery_reservation_mail_to_customer(reservation.id).deliver_now
            lottery_lost_reservations.push(reservation)
          end
          total_confirmed_reservations[reserve_frame.id.to_s + '_confirmed_reservations'] = confirmed_reservations
          total_lottery_lost_reservations[reserve_frame.id.to_s + '_lottery_lost_reservations'] = lottery_lost_reservations
        end
      end
      render json: {  status: 'success',
                      confirmed_reservations: total_confirmed_reservations,
                      lottery_lost_reservations: total_lottery_lost_reservations }, status: 200
    end
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
