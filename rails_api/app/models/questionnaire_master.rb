class QuestionnaireMaster < ApplicationRecord
  validates :title, presence: true

  def parse_question_form_json
    JSON.parse self.question_form_json.gsub("=>", ":").gsub(" ", "")
  end
end
