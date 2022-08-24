import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FORM_TYPE } from 'constants/formType'
import { questionnaireMasterItem } from 'interfaces/questionnaireMasterItems'

export const questionnaireMasterSlice = createSlice({
  name: 'alert',
  initialState: {
    showAddFormModal: false,
    selectedFormType: String(FORM_TYPE.TEXT),
    title: '',
    desctiption: '',
    question: '',
    formType: '',
    textFormRowCount: 1,
    selectFormAnswers: [] as string[],
    radioButtonAnswers: [] as string[],
    checkboxAnswers: [] as string[],
    questionnaireMasterItems: [] as questionnaireMasterItem[]

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
    desctiptionChanged: (state, action: PayloadAction<string>) => {
      state.desctiption = action.payload
    },
    questionChanged: (state, action: PayloadAction<string>) => {
      state.question = action.payload
    },
    formTypeChanged: (state, action: PayloadAction<string>) => {
      state.desctiption = action.payload
    },
    textFormRowCountChanged: (state, action: PayloadAction<number>) => {
      state.textFormRowCount = action.payload
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
    questionnaireMasterItemsChanged: (state, action: PayloadAction<questionnaireMasterItem[]>) => {
      state.questionnaireMasterItems = action.payload
    },
  },
})

export const { showAddFormModalChanged } = questionnaireMasterSlice.actions
export const { selectedFormTypeChanged } = questionnaireMasterSlice.actions
export const { titleChanged } = questionnaireMasterSlice.actions
export const { desctiptionChanged } = questionnaireMasterSlice.actions
export const { questionChanged } = questionnaireMasterSlice.actions
export const { formTypeChanged } = questionnaireMasterSlice.actions
export const { textFormRowCountChanged } = questionnaireMasterSlice.actions
export const { selectFormAnswersChanged } = questionnaireMasterSlice.actions
export const { radioButtonAnswersChanged } = questionnaireMasterSlice.actions
export const { checkboxAnswersChanged } = questionnaireMasterSlice.actions
export const { questionnaireMasterItemsChanged } = questionnaireMasterSlice.actions

export default questionnaireMasterSlice.reducer
