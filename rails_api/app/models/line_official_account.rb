class LineOfficialAccount < ApplicationRecord
  include PublicIdModule

  belongs_to :account
  has_many :line_official_account_user_relation
  has_many :line_users, through: :line_official_account_user_relation

  def messaging_api_webhook_url
    ENV["BACKEND_URL"] + "/api/v1/line/messaging_webhook/" + self.public_id
  end
end
