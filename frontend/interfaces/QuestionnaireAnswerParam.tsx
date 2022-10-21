export interface QuestionnaireAnswerParam {
  public_id: string
  id: string
  customer_name: string
  answer_datetime: string
  answers_json: string
  answer: AnswersParam[]
}

export interface AnswersParam {
  question: string
  answer: string
}
