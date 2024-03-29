import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FORM_TYPE } from 'constants/formType'
import { QuestionnaireMasterItem } from 'interfaces/QuestionnaireMasterItem'

export const questionnaireMasterSlice = createSlice({
  name: 'questionnaireMaster',
  initialState: {
    showAddFormModal: false,
    selectedFormType: String(FORM_TYPE.TEXT),
    title: '',
    description: '',
    question: '',
    textFormRowCount: 1,
    currentMaxSortOrder: 0,
    publishStatus: '',
    disableSubmitAnswer: false,
    // 回答が変わったことの検知
    answerChangeDetectState: 0,
    selectFormAnswers: [] as string[],
    radioButtonAnswers: [] as string[],
    checkboxAnswers: [] as string[],
    questionnaireMasterItems: [] as QuestionnaireMasterItem[],
    answersJson: [] as any
  },
  reducers: {
    showAddFormModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showAddFormModal = action.payload
    },
    selectedFormTypeChanged: (state, action: PayloadAction<string>) => {
      state.selectedFormType = action.payload
    },
    titleChanged: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
    descriptionChanged: (state, action: PayloadAction<string>) => {
      state.description = action.payload
    },
    publishStatusChanged: (state, action: PayloadAction<string>) => {
      state.publishStatus = action.payload
    },
    disableSubmitAnswerChanged: (state, action: PayloadAction<boolean>) => {
      state.disableSubmitAnswer = action.payload
    },
    questionChanged: (state, action: PayloadAction<string>) => {
      state.question = action.payload
    },
    textFormRowCountChanged: (state, action: PayloadAction<number>) => {
      state.textFormRowCount = action.payload
    },
    currentMaxSortOrderChanged: (state, action: PayloadAction<number>) => {
      state.currentMaxSortOrder = action.payload
    },
    answerChangeDetectStateChanged: (state, action: PayloadAction<number>) => {
      state.answerChangeDetectState = action.payload
    },
    selectFormAnswersChanged: (state, action: PayloadAction<string[]>) => {
      state.selectFormAnswers = action.payload
    },
    radioButtonAnswersChanged: (state, action: PayloadAction<string[]>) => {
      state.radioButtonAnswers = action.payload
    },
    checkboxAnswersChanged: (state, action: PayloadAction<string[]>) => {
      state.checkboxAnswers = action.payload
    },
    questionnaireMasterItemsChanged: (state, action: PayloadAction<QuestionnaireMasterItem[]>) => {
      state.questionnaireMasterItems = action.payload
    },
    answersJsonChanged: (state, action: PayloadAction<any>) => {
      state.answersJson = action.payload
    },
  },
})

export const { showAddFormModalChanged } = questionnaireMasterSlice.actions
export const { selectedFormTypeChanged } = questionnaireMasterSlice.actions
export const { titleChanged } = questionnaireMasterSlice.actions
export const { descriptionChanged } = questionnaireMasterSlice.actions
export const { publishStatusChanged } = questionnaireMasterSlice.actions
export const { disableSubmitAnswerChanged } = questionnaireMasterSlice.actions
export const { questionChanged } = questionnaireMasterSlice.actions
export const { currentMaxSortOrderChanged } = questionnaireMasterSlice.actions
export const { textFormRowCountChanged } = questionnaireMasterSlice.actions
export const { answerChangeDetectStateChanged } = questionnaireMasterSlice.actions
export const { selectFormAnswersChanged } = questionnaireMasterSlice.actions
export const { radioButtonAnswersChanged } = questionnaireMasterSlice.actions
export const { checkboxAnswersChanged } = questionnaireMasterSlice.actions
export const { questionnaireMasterItemsChanged } = questionnaireMasterSlice.actions
export const { answersJsonChanged } = questionnaireMasterSlice.actions

export default questionnaireMasterSlice.reducer
