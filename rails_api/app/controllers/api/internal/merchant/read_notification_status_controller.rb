class Api::Internal::Merchant::ReadNotificationStatusController < ApplicationController
  before_action :merchant_login_only!

  def read_dashboard
    current_merchant_user.read_dashboard_AlreadyRead!
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def read_reservations
    current_merchant_user.read_reservations_status_AlreadyRead!
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def read_questionnaire_answers
    current_merchant_user.read_questionnaire_answers_status_AlreadyRead!
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def read_account_notifications_status
    current_merchant_user.read_account_notifications_status_AlreadyRead!
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def read_business_notifications_status
    current_merchant_user.read_business_notifications_status_AlreadyRead!
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def read_orders
    current_merchant_user.read_orders_status_AlreadyRead!
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
