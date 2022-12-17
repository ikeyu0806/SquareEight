import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HtmlMailTemplateParam } from 'interfaces/HtmlMailTemplateParam'

export const sendMailSlice = createSlice({
  name: 'sendMail',
  initialState: {
    // notUse, messageTemplate, htmlMailTemplate
    messageTemplateType: 'notUse'
  },
  reducers: {
    messageTemplateTypeChanged: (state, action: PayloadAction<string>) => {
      state.messageTemplateType = action.payload
    },
  },
})

export const { messageTemplateTypeChanged } = sendMailSlice.actions

export default sendMailSlice.reducer
