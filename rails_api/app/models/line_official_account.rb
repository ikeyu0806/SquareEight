class LineOfficialAccount < ApplicationRecord
  include PublicIdModule

  belongs_to :account

  def messaging_api_webhook_url
    ENV["FRONTEND_URL"] + "/api/v1/line/messaging_webhook/" + self.public_id
  end
end
