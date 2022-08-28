import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const messageTemplateSlice = createSlice({
  name: 'messageTemplate',
  initialState: {
    showCreateMessageTemplateModal: false,
    name: '',
    content: ''
  },
  reducers: {
    showCreateMessageTemplateModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showCreateMessageTemplateModal = action.payload
    },
    nameChanged: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    contentChanged: (state, action: PayloadAction<string>) => {
      state.content = action.payload
    },
  },
})

export const { showCreateMessageTemplateModalChanged } = messageTemplateSlice.actions
export const { nameChanged } = messageTemplateSlice.actions
export const { contentChanged } = messageTemplateSlice.actions

export default messageTemplateSlice.reducer
