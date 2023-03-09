class Api::Internal::QuestionnaireMastersController < ApplicationController
  before_action :merchant_login_only!, except: [:show]

  def index
    questionnaire_masters = current_merchant_user.account.questionnaire_masters.enabled.order(:id)
    # ページネーション
    current_page = params[:current_page].to_i
    display_count = params[:display_count].to_i
    questionnaire_masters = questionnaire_masters.order(:id)
    last_page, remainder = questionnaire_masters.count.divmod(display_count)
    last_page += 1 if remainder.positive?
    questionnaire_masters = questionnaire_masters.first(current_page * display_count).last(display_count)
    render json: { status: 'success',
                   questionnaire_masters: questionnaire_masters,
                   last_page: last_page }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def create
    raise "アンケートマスタ登録可能数を超えています" if current_merchant_user.account.questionnaire_masters.count >= current_merchant_user.account.questionnaire_master_limit
    questionnaire_master = current_merchant_user.account.questionnaire_masters.create!(questionnaire_master_params)
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update
    QuestionnaireMaster.find_by(public_id: params[:public_id]).update!(questionnaire_master_params.except(:id))
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def show
    questionnaire_master = QuestionnaireMaster.find_by(public_id: params[:public_id])
    shared_component = questionnaire_master.account.shared_component
    shared_component = JSON.parse(shared_component.to_json(methods: [:navbar_image_account_s3_image_public_url]))
    questionnaire_master = JSON.parse(questionnaire_master.to_json(methods: [:parse_question_form_json]))
    render json: { status: 'success', questionnaire_master: questionnaire_master, shared_component: shared_component }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def edit_info
    questionnaire_master = QuestionnaireMaster.find_by(public_id: params[:public_id])
    questionnaire_master = JSON.parse(questionnaire_master.to_json(methods: [:parse_question_form_json, :current_max_sort_order]))
    render json: { status: 'success', questionnaire_master: questionnaire_master }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def answers
    questionnaire_master = QuestionnaireMaster.find_by(public_id: params[:public_id])
    answer_contents = questionnaire_master.answer_contents
    render json: { status: 'success',
                   answer_contents: answer_contents,
                   questionnaire_master: questionnaire_master }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def logical_delete
    questionnaire_master = QuestionnaireMaster.find_by(public_id: params[:public_id])
    questionnaire_master.logical_delete
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
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
