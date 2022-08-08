class Api::Internal::DeliveryTargetsController < ApplicationController
  before_action :end_user_login_only!

  def index
    delivery_targets = current_end_user.delivery_targets
    render json: { status: 'success', delivery_targets: delivery_targets }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    current_end_user.delivery_targets.create!(delivery_target_params)
    render json: { status: 'success' }, states: 200
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
