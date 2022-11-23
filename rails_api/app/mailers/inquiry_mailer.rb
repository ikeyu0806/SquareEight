class InquiryMailer < ApplicationMailer
  def send_mail_to_admin(email, content)
    @email = email
    @content = content
    mail(to: @email, subject: "お問い合わせを受け付けました", bcc: ENV["ADMIN_MAIL_ADDRESSES"])
  end
end
