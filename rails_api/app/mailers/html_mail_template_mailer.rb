class HtmlMailTemplateMailer < ApplicationMailer
  def send_mail(email, parsed_content, mail_title)
    @parsed_content = parsed_content
    mail(to: email, subject: mail_title)
  end
end
