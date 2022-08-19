class Api::Internal::ReservationsController < ApplicationController
  def create
    ActiveRecord::Base.transaction do
      reserve_frame = ReserveFrame.find(reservation_params[:reserve_frame_id])
      # 定員オーバチェック
      capacity = reserve_frame.capacity
      date = reservation_params[:date].split("-")
      start_at = reservation_params[:time].split("-")[0].split(":")
      end_at = reservation_params[:time].split("-")[1].split(":")
      start_datetime = DateTime.new(date[0].to_i, date[1].to_i, date[2].to_i, start_at[0].to_i, start_at[1].to_i)
      end_datetime = DateTime.new(date[0].to_i, date[1].to_i, date[2].to_i, end_at[0].to_i, end_at[1].to_i)
      # 予約済み数カウント
      reserved_count = reserve_frame.reservations.where(start_at: start_datetime, end_at: end_datetime).count
      # ステータス
      case reserve_frame.reception_type
      when 'Immediate'
        status = 'confirm'
      when 'Temporary'
        status = 'pendingVerifivation'
      else
        raise 'reserveFrame reception type invalid'
      end
      # 確定
      reserve_frame
      .reservations
      .create!(number_of_people: reservation_params[:reserve_count],
               price: reservation_params[:price],
               start_at: start_datetime,
               end_at: end_datetime,
               status: status,
               representative_first_name: reservation_params[:first_name],
               representative_last_name: reservation_params[:last_name],
               payment_method: reservation_params[:payment_method])
      # 同じ携帯電話番号の顧客データがなければ作成
      if reserve_frame.account.customers.find_by(phone_number: reservation_params[:phone_number]).blank?
        reserve_frame
        .account
        .customers
        .create!(first_name: reservation_params[:first_name],
                 last_name: reservation_params[:last_name],
                 email: reservation_params[:email],
                 phone_number: reservation_params[:phone_number])
      end
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def reservation_params
    params.require(:reservations)
          .permit(:id,
                  :last_name,
                  :first_name,
                  :email,
                  :phone_number,
                  :reserve_frame_id,
                  :date,
                  :time,
                  :start_at,
                  :end_at,
                  :number_of_people,
                  :end_user_id,
                  :customer_id,
                  :type,
                  :payment_method,
                  :reserve_count,
                  :price)
  end
end
