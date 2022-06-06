class MerchantUserMailer < ApplicationMailer
  def send_verification_code(email, encode_email, verification_code)
    @email = email
    @verification_code = verification_code
    @url = ENV["FRONTEND_URL"] + '/verification_code?email=' + encode_email
    mail(to: @email, subject: "GoocoIDに招待されています")
  end
end
