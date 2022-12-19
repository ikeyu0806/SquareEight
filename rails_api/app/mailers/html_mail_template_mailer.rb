class HtmlMailTemplateMailer < ApplicationMailer
  def send_mail(email, parsed_content, mail_title, template_type)
    @parsed_content = parsed_content
    @template_type = template_type
    mail(to: email, subject: mail_title)
  end
end
