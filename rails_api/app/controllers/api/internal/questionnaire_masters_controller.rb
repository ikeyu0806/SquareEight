class Api::Internal::QuestionnaireMastersController < ApplicationController
  before_action :merchant_login_only!

  def create
    QuestionnaireMaster.create!(questionnaire_master_params)
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def questionnaire_master_params
    params.require(:questionnaire_master)
          .permit(:id, :title, :description, :questionnaire_master_items)
  end
end
