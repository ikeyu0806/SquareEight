export interface QuestionnaireMasterItem {
  question: string
  formType: string
  textFormRowCount?: number
  selectFormAnswers?: string[]
  radioButtonAnswers?: string[]
  checkboxAnswers?: string[]
}
