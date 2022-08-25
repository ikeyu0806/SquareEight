export interface QuestionnaireMasterItem {
  question: string
  formType: string
  sortOrder: number
  questionId: string
  textFormRowCount?: number
  selectFormAnswers?: string[]
  radioButtonAnswers?: string[]
  checkboxAnswers?: string[]
}
