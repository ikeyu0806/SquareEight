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
    questionnaireMasterItem: {} as questionnaireMasterItem,
    questionnaireMasterItems: [] as questionnaireMasterItem[]

  },
  reducers: {
    showAddFormModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showAddFormModal = action.payload
    },
    selectedFormTypeChanged: (state, action: PayloadAction<string>) => {
      state.selectedFormType = action.payload
    },
    questionnaireMasterItemChanged: (state, action: PayloadAction<questionnaireMasterItem>) => {
      state.questionnaireMasterItem = action.payload
    },
    questionnaireMasterItemsChanged: (state, action: PayloadAction<questionnaireMasterItem[]>) => {
      state.questionnaireMasterItems = action.payload
    },
  },
})

export const { showAddFormModalChanged } = questionnaireMasterSlice.actions
export const { selectedFormTypeChanged } = questionnaireMasterSlice.actions
export const { questionnaireMasterItemChanged } = questionnaireMasterSlice.actions
export const { questionnaireMasterItemsChanged } = questionnaireMasterSlice.actions

export default questionnaireMasterSlice.reducer
