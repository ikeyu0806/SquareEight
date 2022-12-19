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
    selectedCustomer: {} as CustomerParam,
    selectedCustomerGroup: {} as CustomerGroupParam,
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
    customersChanged: (state, action: PayloadAction<CustomerParam[]>) => {
      state.customers = action.payload
    },
    customerGroupsChanged: (state, action: PayloadAction<CustomerGroupParam[]>) => {
      state.customerGroups = action.payload
    },
    selectedCustomerChanged: (state, action: PayloadAction<CustomerParam>) => {
      state.selectedCustomer = action.payload
    },
    selectedCustomerGroupChanged: (state, action: PayloadAction<CustomerGroupParam>) => {
      state.selectedCustomerGroup = action.payload
    },
  },
})

export const { showSendHtmlMessageModalChanged } = sendMailSlice.actions
export const { sendTargetTypeChanged } = sendMailSlice.actions
export const { messageTemplateTypeChanged } = sendMailSlice.actions
export const { selectedHtmlMailTemplateChanged } = sendMailSlice.actions
export const { customersChanged } = sendMailSlice.actions
export const { customerGroupsChanged } = sendMailSlice.actions
export const { selectedCustomerChanged } = sendMailSlice.actions
export const { selectedCustomerGroupChanged } = sendMailSlice.actions

export default sendMailSlice.reducer
