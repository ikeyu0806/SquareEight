class QuestionnaireAnswer < ApplicationRecord
  belongs_to :questionnaire_master

  def parse_answer_json
    JSON.parse self.answers_json.gsub("=>", ":").gsub(" ", "")
  end
end
