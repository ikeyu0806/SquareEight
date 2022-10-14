class MerchantUserMailer < ApplicationMailer
  def send_verification_code(email, encode_email, verification_code)
    @email = email
    @verification_code = verification_code
    @url = ENV["FRONTEND_URL"] + '/merchant/verification_code?email=' + encode_email
    mail(to: @email, subject: "【検証コード】SquareEight")
  end

  def send_update_email_verification_code(email, encode_email, verification_code)
    @email = email
    @verification_code = verification_code
    @url = ENV["FRONTEND_URL"] + '/merchant/update_email_verification_code?email=' + encode_email
    mail(to: @email, subject: "【検証コード】SquareEight")
  end

  def registration_complete(email)
    @email = email
    mail(to: @email, subject: "【SquareEight】アカウント登録完了のご案内")
  end

  def reset_password(email, url)
    @url = url
    mail(to: email, subject: "【SquareEight】パスワードリセットを受け付けました")
  end
end
