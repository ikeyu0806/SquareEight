import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const messageTemplateSlice = createSlice({
  name: 'messageTemplate',
  initialState: {
    id: '',
    showCreateMessageTemplateModal: false,
    showEditMessageTemplateModal: false,
    name: '',
    content: ''
  },
  reducers: {
    idChanged: (state, action: PayloadAction<string>) => {
      state.id = action.payload
    },
    showCreateMessageTemplateModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showCreateMessageTemplateModal = action.payload
    },
    showEditMessageTemplateModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showEditMessageTemplateModal = action.payload
    },
    nameChanged: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    contentChanged: (state, action: PayloadAction<string>) => {
      state.content = action.payload
    },
  },
})

export const { idChanged } = messageTemplateSlice.actions
export const { showCreateMessageTemplateModalChanged } = messageTemplateSlice.actions
export const { showEditMessageTemplateModalChanged } = messageTemplateSlice.actions
export const { nameChanged } = messageTemplateSlice.actions
export const { contentChanged } = messageTemplateSlice.actions

export default messageTemplateSlice.reducer
