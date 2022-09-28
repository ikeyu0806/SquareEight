class EndUserMailer < ApplicationMailer
  def send_verification_code(email, encode_email, verification_code)
    @email = email
    @verification_code = verification_code
    @url = ENV["FRONTEND_URL"] + '/customer/verification_code?email=' + encode_email
    mail(to: @email, subject: "【検証コード】SquareEight")
  end

  def send_update_email_verification_code(email, encode_email, verification_code)
    @email = email
    @verification_code = verification_code
    @url = ENV["FRONTEND_URL"] + '/customer/update_email_verification_code?email=' + encode_email
    mail(to: @email, subject: "【検証コード】SquareEight")
  end

  def registration_complete(end_user_id)
    @end_user = EndUser.find(end_user_id)
    mail(to: @end_user.email, subject: "【SquareEight】ユーザ登録完了のご案内")
  end
end
