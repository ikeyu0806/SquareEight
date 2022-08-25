class Api::Internal::QuestionnaireMastersController < ApplicationController
  before_action :merchant_login_only!

  def index
    questionnaire_masters = current_merchant_user.account.questionnaire_masters
    render json: { status: 'success', questionnaire_masters: questionnaire_masters }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    questionnaire_master = current_merchant_user.account.questionnaire_masters.create!(questionnaire_master_params)
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update
    QuestionnaireMaster.find(params[:id]).update!(questionnaire_master_params.except(:id))
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def show
    questionnaire_master = QuestionnaireMaster.find(params[:id])
    questionnaire_master = JSON.parse(questionnaire_master.to_json(methods: [:parse_question_form_json]))
    render json: { status: 'success', questionnaire_master: questionnaire_master }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def questionnaire_master_params
    params.require(:questionnaire_master)
          .permit(:id,
                  :title,
                  :description,
                  question_form_json: [:question,
                                       :formType,
                                       :textFormRowCount,
                                       selectFormAnswers: [],
                                       radioButtonAnswers: [],
                                       checkboxAnswers: []])
  end
end
