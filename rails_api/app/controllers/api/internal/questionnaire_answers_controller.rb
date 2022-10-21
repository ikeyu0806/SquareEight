class Api::Internal::QuestionnaireAnswersController < ApplicationController

  def show
    questionnaire_answer = QuestionnaireAnswer.find_by(public_id: params[:public_id])
    customer = questionnaire_answer.customer
    render json: { status: 'success',
                   customer: customer,
                   questionnaire_answer: questionnaire_answer }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    ActiveRecord::Base.transaction do
      questionnaire_master = QuestionnaireMaster.find_by(public_id: params[:questionnaire_master_id])
      account = questionnaire_master.account
      # 電話番号、メールアドレスに一致するcustomerがなければ作成
      customer = account.customers.find_by(phone_number: questionnaire_answer_params[:phone_number])
      customer = account.customers.find_by(email: questionnaire_answer_params[:email]) if customer.blank?
      customer = account.customers.new if customer.blank?
      customer.attributes = questionnaire_answer_params.except(:answer)
      customer.save!
      # 回答データ作成
      questionnaire_answer = questionnaire_master.questionnaire_answers
                             .create!( customer_id: customer.id,
                                       title: questionnaire_master.title,
                                       answers_json: questionnaire_answer_params[:answer].to_json)
      # 通知作成
      account_notification_title = customer.full_name + 'が ' + questionnaire_master.title + ' アンケートに回答しました'
      account_notification_url = '/admin/customer/' + customer.public_id + '/questionnaire_answers'
      account.account_notifications
      .create!(title: account_notification_title, url: account_notification_url)
      render json: { status: 'success', questionnaire_answer: questionnaire_answer }, status: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def questionnaire_answer_params
    params.require(:questionnaire_answer)
          .permit(:id,
                  :public_id,
                  :email,
                  :phone_number,
                  :last_name,
                  :first_name,
                  answer: [:question, :answer])
  end
end
