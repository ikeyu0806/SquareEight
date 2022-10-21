export interface QuestionnaireAnswerParam {
  public_id: string
  id: string
  customer_name: string
  answer_datetime: string
  answer: AnswersParam[]
}

interface AnswersParam {
  question: string
  answer: string
}
