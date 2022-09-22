class Api::Internal::QuestionnaireMastersController < ApplicationController
  before_action :merchant_login_only!, except: [:show]

  def index
    questionnaire_masters = current_merchant_user.account.questionnaire_masters.enabled.order(:id)
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
    shared_component = questionnaire_master.account.shared_component
    questionnaire_master = JSON.parse(questionnaire_master.to_json(methods: [:parse_question_form_json]))
    render json: { status: 'success', questionnaire_master: questionnaire_master, shared_component: shared_component }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def edit_info
    questionnaire_master = QuestionnaireMaster.find(params[:id])
    questionnaire_master = JSON.parse(questionnaire_master.to_json(methods: [:parse_question_form_json, :current_max_sort_order]))
    render json: { status: 'success', questionnaire_master: questionnaire_master }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def answers
    questionnaire_master = QuestionnaireMaster.find(params[:id])
    answer_contents = questionnaire_master.answer_contents
    render json: { status: 'success',
                   answer_contents: answer_contents,
                   questionnaire_master: questionnaire_master }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def logical_delete
    questionnaire_master = QuestionnaireMaster.find(:id)
    questionnaire_master.logical_delete
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def questionnaire_master_params
    params.require(:questionnaire_master)
          .permit(:id,
                  :title,
                  :description,
                  :publish_status,
                  question_form_json: [:question,
                                       :formType,
                                       :textFormRowCount,
                                       :sortOrder,
                                       :questionId,
                                       selectFormAnswers: [],
                                       radioButtonAnswers: [],
                                       checkboxAnswers: []])
  end
end
