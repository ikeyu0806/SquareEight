import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MessageTemplateParam } from 'interfaces/MessageTemplateParam'
import { CustomerParam } from 'interfaces/CustomerParam'
import { LineOfficialAccountParam } from 'interfaces/LineOfficialAccountParam'
import { HtmlMailTemplateParam } from 'interfaces/HtmlMailTemplateParam'

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    showLineOfficialAccountModal: false,
    lineOfficialAccounts: [] as LineOfficialAccountParam[],
    customers: [] as CustomerParam[],
    messageTemplates: [] as MessageTemplateParam[],
    htmlMailTemplate: [] as HtmlMailTemplateParam[]
  },
  reducers: {
    showLineOfficialAccountModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showLineOfficialAccountModal = action.payload
    },
    lineOfficialAccountsChanged: (state, action: PayloadAction<LineOfficialAccountParam[]>) => {
      state.lineOfficialAccounts = action.payload
    },
    customersChanged: (state, action: PayloadAction<CustomerParam[]>) => {
      state.customers = action.payload
    },
    messageTemplatesChanged: (state, action: PayloadAction<MessageTemplateParam[]>) => {
      state.messageTemplates = action.payload
    },
    htmlMailTemplateChanged: (state, action: PayloadAction<HtmlMailTemplateParam[]>) => {
      state.htmlMailTemplate = action.payload
    },
  },
})

export const { showLineOfficialAccountModalChanged } = accountSlice.actions
export const { lineOfficialAccountsChanged } = accountSlice.actions
export const { customersChanged } = accountSlice.actions
export const { messageTemplatesChanged } = accountSlice.actions
export const { htmlMailTemplateChanged } = accountSlice.actions

export default accountSlice.reducer
