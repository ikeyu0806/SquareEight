class ApplicationMailer < ActionMailer::Base
  default from: "noreply@" + ENV["AWS_SES_DOMAIN"]
  layout "mailer"
end
