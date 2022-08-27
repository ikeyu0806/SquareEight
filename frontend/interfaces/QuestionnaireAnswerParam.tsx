export interface QuestionnaireAnswerParam {
  id: string
  title: string
  answers: AnswersParam[]
}

interface AnswersParam {
  question: string
  answer: string
}
