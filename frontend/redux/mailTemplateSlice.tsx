import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const mailTemplateSlice = createSlice({
  name: 'mailTemplate',
  initialState: {
    showCreateMailTemplateModal: false,
    templateName: '',
    templateContent: ''
  },
  reducers: {
    showCreateMailTemplateModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showCreateMailTemplateModal = action.payload
    },
    templateNameChanged: (state, action: PayloadAction<string>) => {
      state.templateName = action.payload
    },
    templateContentChanged: (state, action: PayloadAction<string>) => {
      state.templateContent = action.payload
    },
  },
})

export const { showCreateMailTemplateModalChanged } = mailTemplateSlice.actions
export const { templateNameChanged } = mailTemplateSlice.actions
export const { templateContentChanged } = mailTemplateSlice.actions

export default mailTemplateSlice.reducer
