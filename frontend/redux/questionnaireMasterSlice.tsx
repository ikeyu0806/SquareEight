import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FORM_TYPE } from 'constants/formType'

export const questionnaireMasterSlice = createSlice({
  name: 'alert',
  initialState: {
    showAddFormModal: false,
    selectedFormType: String(FORM_TYPE.TEXT)
  },
  reducers: {
    showAddFormModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showAddFormModal = action.payload
    },
    selectedFormTypeChanged: (state, action: PayloadAction<string>) => {
      state.selectedFormType = action.payload
    },
  },
})

export const { showAddFormModalChanged } = questionnaireMasterSlice.actions
export const { selectedFormTypeChanged } = questionnaireMasterSlice.actions

export default questionnaireMasterSlice.reducer
