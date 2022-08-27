export interface QuestionnaireAnswerParam {
  id: string
  customer_name: string
  answer_datetime: string
  answers: AnswersParam[]
}

interface AnswersParam {
  question: string
  answer: string
}
