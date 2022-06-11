class ApplicationController < ActionController::API
  include ActionController::Cookies

  def current_user
    session_hash = Rails.cache.fetch('_session_id:2::' + Digest::SHA256.hexdigest(request.headers["Session-Id"]))
    raise "session not exists" if session_hash.blank?
    user = User.find(session_hash["user_id"])
    raise "current user not exists" if user.blank?
    user
  rescue => error
    Rails.logger.error error
  end
end
