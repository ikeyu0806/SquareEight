FactoryBot.define do
  factory :questionnaire_answer, class: QuestionnaireAnswer do
    title { '質問マスタ' }
    answers_json { "[{\"question\":\"商品の感想\",\"answer\":\"とても良い\"},{\"question\":\"年齢\",\"answer\":\"20代\"}]" }
  end
end
