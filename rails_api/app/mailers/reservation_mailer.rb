class ReservationMailer < ApplicationMailer
  # 仮予約を確定した時のメール
  def send_confirm_mail(email, title, reservation_title, reservation_datetime, payment_method, number_of_people)
    @email = email
    @title = title
    @reservation_title = reservation_title
    @reservation_datetime = reservation_datetime
    @payment_method = payment_method
    @number_of_people = number_of_people
    mail(to: @email, subject: @title)
  end
end
