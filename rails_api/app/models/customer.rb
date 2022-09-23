class Customer < ApplicationRecord
  has_one :end_user, foreign_key: :id, primary_key: :end_user_id
  has_many :orders
  has_many :questionnaire_answers

  validates :first_name, presence: true
  validates :last_name, presence: true

  def full_name
    full_name = ((self.last_name || '') + (self.first_name || ''))
    # 一応名前がない場合の分岐
    full_name.blank? ? '名前が登録されていません' : full_name
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
