import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HtmlMailTemplateParam } from 'interfaces/HtmlMailTemplateParam'

export const sendMailSlice = createSlice({
  name: 'sendMail',
  initialState: {
    showSelectSendHtmlMessageModal: false,
    // Customer, CustomerGroup
    sendTargetType: 'customer',
    // notUse, messageTemplate, htmlMailTemplate
    messageTemplateType: 'notUse',
    selectedHtmlMailTemplate: {}  as HtmlMailTemplateParam
  },
  reducers: {
    showSelectSendHtmlMessageModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showSelectSendHtmlMessageModal = action.payload
    },
    sendTargetTypeChanged: (state, action: PayloadAction<string>) => {
      state.sendTargetType = action.payload
    },
    messageTemplateTypeChanged: (state, action: PayloadAction<string>) => {
      state.messageTemplateType = action.payload
    },
    selectedHtmlMailTemplateChanged: (state, action: PayloadAction<HtmlMailTemplateParam>) => {
      state.selectedHtmlMailTemplate = action.payload
    },
  },
})

export const { showSelectSendHtmlMessageModalChanged } = sendMailSlice.actions
export const { sendTargetTypeChanged } = sendMailSlice.actions
export const { messageTemplateTypeChanged } = sendMailSlice.actions
export const { selectedHtmlMailTemplateChanged } = sendMailSlice.actions

export default sendMailSlice.reducer
