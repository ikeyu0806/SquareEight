class PaymentRequestMailer < ApplicationMailer
  def payment_request_mail(email, title, content)
    @content = content
    mail(to: email, subject: title)
  end
end
