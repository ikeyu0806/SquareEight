import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HtmlMailTemplateParam } from 'interfaces/HtmlMailTemplateParam'

export const sendMailSlice = createSlice({
  name: 'sendMail',
  initialState: {
    // notUse, messageTemplate, htmlMailTemplate
    messageTemplateType: 'notUse',
    selectedHtmlMailTemplate: {}  as HtmlMailTemplateParam
  },
  reducers: {
    messageTemplateTypeChanged: (state, action: PayloadAction<string>) => {
      state.messageTemplateType = action.payload
    },
    selectedHtmlMailTemplateChanged: (state, action: PayloadAction<HtmlMailTemplateParam>) => {
      state.selectedHtmlMailTemplate = action.payload
    },
  },
})

export const { messageTemplateTypeChanged } = sendMailSlice.actions
export const { selectedHtmlMailTemplateChanged } = sendMailSlice.actions

export default sendMailSlice.reducer
