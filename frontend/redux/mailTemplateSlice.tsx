import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const mailTemplateSlice = createSlice({
  name: 'mailTemplate',
  initialState: {
    showCreateMailTemplateModal: false,
  },
  reducers: {
    showCreateMailTemplateModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showCreateMailTemplateModal = action.payload
    },
  },
})

export const { showCreateMailTemplateModalChanged } = mailTemplateSlice.actions

export default mailTemplateSlice.reducer
