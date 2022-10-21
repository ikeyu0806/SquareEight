class Api::Internal::DeliveryTargetsController < ApplicationController
  before_action :end_user_login_only!

  def index
    delivery_targets = current_end_user.delivery_targets.order(:id)
    render json: { status: 'success', delivery_targets: delivery_targets }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    if delivery_target_params[:is_default] == true
      current_end_user.delivery_targets.update_all(is_default: false)
    end
    current_end_user.delivery_targets.create!(delivery_target_params)
    render json: { status: 'success' }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def destroy
    current_end_user.delivery_targets.find_by(public_id: params[:public_id]).destroy
    render json: { status: 'success' }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update_default
    ActiveRecord::Base.transaction do
      current_end_user.delivery_targets.update_all(is_default: false)
      current_end_user.delivery_targets.find_by(public_id: params[:public_id]).update!(is_default: true)
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def delivery_target_params
    params.require(:delivery_target)
          .permit(:id,
                  :first_name,
                  :last_name,
                  :postal_code,
                  :state,
                  :city,
                  :town,
                  :line1,
                  :line2,
                  :phone_number,
                  :is_default)
  end
end
