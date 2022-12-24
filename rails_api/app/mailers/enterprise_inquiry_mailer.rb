class EnterpriseInquiryMailer < ApplicationMailer
  def send_mail_to_admin(name, email, business_name, content)
    @name = name
    @email = email
    @business_name = business_name
    @content = content
    mail(to: @email, subject: "エンタープライズ向けフォームからのお問い合わせを受け付けました", bcc: ENV["ADMIN_MAIL_ADDRESSES"])
  end
end
