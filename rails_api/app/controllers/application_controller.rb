class ApplicationController < ActionController::API
  include ActionController::Cookies

  def current_merchant_user
    session_hash = Rails.cache.fetch('_session_id:2::' + Digest::SHA256.hexdigest(request.headers["Session-Id"]))
    raise "session not exists" if session_hash.blank?
    user = MerchantUser.find(session_hash["merchant_user_id"])
    raise "current user not exists" if user.blank?
    user
  rescue => error
    Rails.logger.error error
    nil
  end

  def current_end_user
    session_hash = Rails.cache.fetch('_session_id:2::' + Digest::SHA256.hexdigest(request.headers["Session-Id"]))
    raise "session not exists" if session_hash.blank?
    user = EndUser.find(session_hash["end_user_id"])
    raise "current user not exists" if user.blank?
    user
  rescue => error
    Rails.logger.error error
    nil
  end

  def merchant_login_only!
    render json: { errMessage: "ログインしてください" }, status: 401 and return if current_merchant_user.blank?
    true
  end

  def end_user_login_only!
    render json: { errMessage: "ログインしてください" }, status: 401 and return if current_end_user.blank?
    true
  end

  def display_current_date
    Time.zone.now.strftime("%Y/%m/%d")
  end
end
