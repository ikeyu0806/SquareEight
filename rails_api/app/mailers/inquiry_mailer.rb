class InquiryMailer < ApplicationMailer
  def send_confirm_mail(organization, email, phone_number, content, inquiry_type)
    @organization = organization
    @email = email
    @phone_number = phone_number
    @content = content
    @inquiry_type = inquiry_type
    mail(to: @email, subject: "お問い合わせを受け付けました", bcc: ENV["ADMIN_MAIL_ADDRESSES"])
  end
end
