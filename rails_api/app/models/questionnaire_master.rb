class QuestionnaireMaster < ApplicationRecord
  belongs_to :account
  has_many :questionnaire_answers

  validates :title, presence: true

  enum publish_status: { Unpublish: 0, Publish: 1 }

  scope :enabled, -> { where(deleted_at: nil) }

  def parse_question_form_json
    JSON.parse self.question_form_json.gsub("=>", ":").gsub(" ", "")
  end

  def current_max_sort_order
    parse_question_form_json.last["sortOrder"] + 1
  end

  def answer_contents
    result = []
    questionnaire_answers.order(:id).each do |questionnaire_answer|
      result.push({answer: questionnaire_answer.parse_answer_json,
                   customer_name: questionnaire_answer.customer.full_name,
                   answer_datetime: questionnaire_answer.created_at.strftime("%Y年%m月%d日 %H時%M分")})
    end
    result
  end
end
