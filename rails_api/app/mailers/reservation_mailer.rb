class ReservationMailer < ApplicationMailer
  # 予約を確定した時のメール
  def send_end_user_confirm_mail(email, title, reservation_title, reservation_datetime, payment_method, number_of_people)
    @email = email
    @title = title
    @reservation_title = reservation_title
    @reservation_datetime = reservation_datetime
    @payment_method = payment_method
    @number_of_people = number_of_people
    mail(to: @email, subject: @title)
  end

  def send_merchant_confirm_mail(merchant_email, reservation_id, reserve_frame_id, customer_id, reservation_datetime, payment_method, reservation_status, price, number_of_people)
    @email = merchant_email
    @reservation = Reservation.find(reservation_id)
    @reservation_datetime = reservation_datetime
    @reserve_frame = ReserveFrame.find(reserve_frame_id)
    @customer = Customer.find(customer_id)
    @payment_method = payment_method
    @reservation_status = reservation_status
    @price = price
    @number_of_people = number_of_people
    mail(to: @email, subject: @reserve_frame.title)
  end
end
