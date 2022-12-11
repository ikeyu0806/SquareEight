class LineOfficialAccount < ApplicationRecord
  include PublicIdModule

  belongs_to :account
  has_many :line_users

  def messaging_api_webhook_url
    ENV["FRONTEND_URL"] + "/api/v1/line/messaging_webhook/" + self.public_id
  end
end
