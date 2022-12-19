import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HtmlMailTemplateParam } from 'interfaces/HtmlMailTemplateParam'

export const sendMailSlice = createSlice({
  name: 'sendMail',
  initialState: {
    showSelectSendMessageTargetModal: false,
    // Customer, CustomerGroup
    sendTargetType: 'customer',
    // notUse, messageTemplate, htmlMailTemplate
    messageTemplateType: 'notUse',
    selectedHtmlMailTemplate: {}  as HtmlMailTemplateParam
  },
  reducers: {
    showSelectSendMessageTargetModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showSelectSendMessageTargetModal = action.payload
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

export const { showSelectSendMessageTargetModalChanged } = sendMailSlice.actions
export const { sendTargetTypeChanged } = sendMailSlice.actions
export const { messageTemplateTypeChanged } = sendMailSlice.actions
export const { selectedHtmlMailTemplateChanged } = sendMailSlice.actions

export default sendMailSlice.reducer
