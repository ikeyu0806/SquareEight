FactoryBot.define do
  factory :send_mail_history, class: SendMailHistory do
    email { 'hoge@example.com' }
    mail_title { 'demo_mail_title' }
    message_body { 'demo_mail_message' }
  end
end
