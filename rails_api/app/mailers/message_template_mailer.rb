class MessageTemplateMailer < ApplicationMailer
  def send_mail(email, title, content)
    @email = email
    @content = content
    @title = title
    mail(to: @email, subject: @title)
  end
end
