class StripeWebhookMailer < ApplicationMailer
  def account_update_mail(account_id, payouts_enabled, requirements)
    @account = Account.find(account_id)
    subject = payouts_enabled ? "Stripeへの決済有効申請が承認されました。" : "Stripeへの決済有効申請がまだ完了しておりません。追加必要項目を確認してください"
    @payouts_enabled = @payouts_enabled
    mail(to: @account.email, subject: subject)
  end
end
