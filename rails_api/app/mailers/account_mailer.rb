class AccountMailer < ApplicationMailer
  def send_mail_to_admin(business_name, email)
    @business_name = business_name
    @email = email
    mail(to: ENV["ADMIN_MAIL_ADDRESSES"], subject: "SquareEightに新規アカウント登録がありました。")
  end
end
