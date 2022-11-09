creds = Aws::Credentials.new(
  ENV['AWS_ACCESS_KEY'],
  ENV['AWS_SECRET_ACCESS_KEY']
)

Aws::Rails.add_action_mailer_delivery_method(
  :ses,
  credentials: creds,
  region: 'ap-northeast-1'
)
