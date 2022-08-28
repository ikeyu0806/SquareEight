import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const mailTemplateSlice = createSlice({
  name: 'mailTemplate',
  initialState: {
    showCreateMessageTemplateModal: false,
    templateName: '',
    templateContent: ''
  },
  reducers: {
    showCreateMessageTemplateModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showCreateMessageTemplateModal = action.payload
    },
    templateNameChanged: (state, action: PayloadAction<string>) => {
      state.templateName = action.payload
    },
    templateContentChanged: (state, action: PayloadAction<string>) => {
      state.templateContent = action.payload
    },
  },
})

export const { showCreateMessageTemplateModalChanged } = mailTemplateSlice.actions
export const { templateNameChanged } = mailTemplateSlice.actions
export const { templateContentChanged } = mailTemplateSlice.actions

export default mailTemplateSlice.reducer
