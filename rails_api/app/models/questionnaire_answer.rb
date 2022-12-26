class QuestionnaireAnswer < ApplicationRecord
  include PublicIdModule

  before_create :update_read_questionnaire_answers_status_unread

  belongs_to :questionnaire_master
  belongs_to :customer

  def update_read_questionnaire_answers_status_unread
    self.questionnaire_master.account.merchant_users.each do |user|
      user.read_questionnaire_answers_status_UnreadExist!
    end
  end

  def parse_answer_json
    JSON.parse self.answers_json.gsub("=>", ":").gsub(" ", "")
  end
end
