class ReservationMailer < ApplicationMailer
  # 予約を確定した時のメール
  def send_end_user_confirm_mail(email, title, reservation_title, reservation_datetime, payment_method, number_of_people, price)
    @email = email
    @title = title
    @reservation_title = reservation_title
    @reservation_datetime = reservation_datetime
    @payment_method = payment_method
    @number_of_people = number_of_people
    @price = price
    mail(to: @email, subject: @title)
  end

  def send_merchant_confirm_mail(merchant_email, subject, reservation_id, reserve_frame_id, customer_id, reservation_datetime, payment_method, reservation_status, price, number_of_people)
    @email = merchant_email
    @subject = subject
    @reservation = Reservation.find(reservation_id)
    @reservation_datetime = reservation_datetime
    @reserve_frame = ReserveFrame.find(reserve_frame_id)
    @customer = Customer.find(customer_id)
    @payment_method = payment_method
    @reservation_status = reservation_status
    @price = price
    @number_of_people = number_of_people
    mail(to: @email, subject: @subject)
  end

  def cancel_mail_to_customer(reservation_id, customer_id)
    @reservation = Reservation.find(reservation_id)
    @customer = Customer.find(customer_id)
    mail(to: @customer.email, subject: '予約をキャンセルしました')
  end

  def cancel_mail_to_merchant(reservation_id, customer_id)
    @reservation = Reservation.find(reservation_id)
    @customer = Customer.find(customer_id)
    account = @reservation.account
    email = account.merchant_user_emails.join(',')
    mail(to: email, subject: @customer.full_name + 'さんが予約をキャンセルしました')
  end
end
