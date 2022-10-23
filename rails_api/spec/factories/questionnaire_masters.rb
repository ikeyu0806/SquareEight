FactoryBot.define do
  factory :questionnaire_master, class: QuestionnaireMaster do
    title { '質問マスタ' }
    description { '説明' }
    question_form_json { "[{\"question\"=>\"商品の感想\", \"formType\"=>\"text\", \"textFormRowCount\"=>3, \"sortOrder\"=>1, \"questionId\"=>\"18402f6939b\", \"selectFormAnswers\"=>[], \"radioButtonAnswers\"=>[], \"checkboxAnswers\"=>[]}, {\"question\"=>\"年齢\", \"formType\"=>\"select\", \"textFormRowCount\"=>1, \"sortOrder\"=>2, \"questionId\"=>\"18402f70d4a\", \"selectFormAnswers\"=>[\"20代\", \"30代\", \"40代\"], \"radioButtonAnswers\"=>[], \"checkboxAnswers\"=>[]}]" }
    publish_status { 'Publish' }
  end
end
