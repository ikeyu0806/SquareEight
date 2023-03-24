FactoryBot.define do
  factory :send_mail_schedule, class: SendMailSchedule do
    email { 'hoge@example.com' }
    mail_title { 'hoge' }
    message_body { 'hoge' }
  end
end
