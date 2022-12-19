import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HtmlMailTemplateParam } from 'interfaces/HtmlMailTemplateParam'
import { CustomerParam } from 'interfaces/CustomerParam'
import { CustomerGroupParam } from 'interfaces/CustomerGroupParam'

export const sendMailSlice = createSlice({
  name: 'sendMail',
  initialState: {
    showSendHtmlMessageModal: false,
    // Customer, CustomerGroup
    sendTargetType: 'customer',
    // notUse, messageTemplate, htmlMailTemplate
    messageTemplateType: 'notUse',
    selectedHtmlMailTemplate: {}  as HtmlMailTemplateParam,
    customers: [] as CustomerParam[],
    customerGroups: [] as CustomerGroupParam[],
  },
  reducers: {
    showSendHtmlMessageModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showSendHtmlMessageModal = action.payload
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
    selectedCustomersChanged: (state, action: PayloadAction<CustomerParam[]>) => {
      state.customers = action.payload
    },
    selectedCustomerGroupsChanged: (state, action: PayloadAction<CustomerGroupParam[]>) => {
      state.customerGroups = action.payload
    },
  },
})

export const { showSendHtmlMessageModalChanged } = sendMailSlice.actions
export const { sendTargetTypeChanged } = sendMailSlice.actions
export const { messageTemplateTypeChanged } = sendMailSlice.actions
export const { selectedHtmlMailTemplateChanged } = sendMailSlice.actions
export const { selectedCustomersChanged } = sendMailSlice.actions
export const { selectedCustomerGroupsChanged } = sendMailSlice.actions

export default sendMailSlice.reducer
