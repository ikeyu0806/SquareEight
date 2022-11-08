class PaymentRequestMailer < ApplicationMailer
  def payment_request_mail(email, title, content)
    @content = content
    mail(to: email, subject: title)
  end

  def payment_complete_mail(payment_request_id)
    @payment_request = StripePaymentRequest.find(payment_request_id)
    @account = @payment_request.account
    subject = '【' + @account.business_name + '】決済が完了しました'
    mail(to: email, subject: subject)
  end
end
