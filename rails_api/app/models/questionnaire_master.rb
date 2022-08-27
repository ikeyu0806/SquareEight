class QuestionnaireMaster < ApplicationRecord
  belongs_to :account
  has_many :questionnaire_answers

  validates :title, presence: true

  def parse_question_form_json
    JSON.parse self.question_form_json.gsub("=>", ":").gsub(" ", "")
  end

  def current_max_sort_order
    parse_question_form_json.last["sortOrder"] + 1
  end
end
