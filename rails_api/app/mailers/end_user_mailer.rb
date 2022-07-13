class EndUserMailer < ApplicationMailer
  def send_verification_code(email, encode_email, verification_code)
    @email = email
    @verification_code = verification_code
    @url = ENV["FRONTEND_URL"] + '/verification_code?email=' + encode_email
    mail(to: @email, subject: "【検証コード】GYBuilder")
  end
end
