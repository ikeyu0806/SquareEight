class Customer < ApplicationRecord
  include PublicIdModule

  has_one :customer_group_relation, foreign_key: :id, primary_key: :customer_id
  has_one :end_user, foreign_key: :id, primary_key: :end_user_id
  has_one :line_user, foreign_key: :customer_id, primary_key: :id
  has_many :orders
  has_many :questionnaire_answers
  has_many :customer_group_relations
  has_many :customer_groups, through: :customer_group_relations

  scope :search, -> (search_word) {
    if search_word.present?
      where("first_name LIKE ?", "%#{search_word}%").
        or(where("last_name LIKE ?", "%#{search_word}%")).
        or(where("first_name_kana LIKE ?", "%#{search_word}%")).
        or(where("last_name_kana LIKE ?", "%#{search_word}%")).
        or(where("email LIKE ?", "%#{search_word}%")).
        or(where("phone_number LIKE ?", "%#{search_word}%"))
    end
  }

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

  def line_display_name
    line_user&.line_display_name
  end

  def line_picture_url
    line_user&.line_picture_url
  end
end
