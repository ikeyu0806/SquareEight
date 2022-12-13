import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MessageTemplateParam } from 'interfaces/MessageTemplateParam'

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    messageTemplates: [] as MessageTemplateParam[]
  },
  reducers: {
    messageTemplatesChanged: (state, action: PayloadAction<MessageTemplateParam[]>) => {
      state.messageTemplates = action.payload
    },
  },
})

export const { messageTemplatesChanged } = accountSlice.actions

export default accountSlice.reducer
