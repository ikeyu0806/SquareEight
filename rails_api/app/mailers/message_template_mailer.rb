class MessageTemplateMailer < ApplicationMailer
  def send_mail(email, title, content)
    @content = content
    mail(to: @email, subject: title)
  end
end
