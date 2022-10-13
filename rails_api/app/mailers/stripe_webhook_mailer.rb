class StripeWebhookMailer < ApplicationMailer
  def account_update_mail(email, account_id, payouts_enabled)
    @account = Account.find(account_id)
    subject = payouts_enabled ? "Stripeへの決済有効申請が承認されました。" : "Stripeへの決済有効申請がまだ完了しておりません。追加必要項目を確認してください"
    @payouts_enabled = @payouts_enabled
    mail(to: email, subject: subject)
  end
end
