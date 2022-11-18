class ApplicationMailer < ActionMailer::Base
  default from: "noreply@" + "square-eight.net"
  layout "mailer"
end
