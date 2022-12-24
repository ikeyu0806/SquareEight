class SendLineHistory < ApplicationRecord
  include PublicIdModule

  belongs_to :account
  belongs_to :line_official_account
  belongs_to :line_user

  def line_official_account_name
    line_official_account.name
  end

  def line_user_display_name
    line_user.line_display_name
  end
end
